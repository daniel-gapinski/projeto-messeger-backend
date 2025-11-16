import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { SendMessageService } from "../services/messegesService/SendMessageService";
import { prismaClient } from "../prisma";
import { logger } from "../logger";

interface JWTPayload {
  sub: string;
}

export function socketHandle(io: Server) {

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      logger.warn("Token não fornecido na conexão do socket");
      return next(new Error("Token não fornecido"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      (socket as any).user_id = decoded.sub;
      next();
    } catch (err) {
      logger.warn({ err }, "Token inválido no handshake do socket");
      next(new Error("Token inválido"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = (socket as any).user_id;

    logger.info({ userId }, "Usuário conectado ao WebSocket");

    socket.join(userId);
    socket.emit("connected", { message: "Conectado ao chat!" });


    socket.on("directMessage", async ({ content, friendId }) => {
      if (!content || !friendId) {
        return socket.emit("error", "Dados inválidos");
      }

      try {
        const friendship = await prismaClient.friend.findUnique({
          where: { id: friendId },
        });

        if (!friendship) {
          logger.warn({ userId, friendId }, "Tentativa de acessar amizade inexistente");
          return socket.emit("error", "Amizade não encontrada");
        }

        const isMember = friendship.requesterId === userId || friendship.addresseeId === userId;

        if (!isMember) {
          logger.warn({ userId, friendId }, "Usuário não permitido a enviar mensagem nesta amizade");
          return socket.emit("error", "Você não tem permissão nesta conversa.");
        }

        const receiverId = friendship.requesterId === userId ? friendship.addresseeId : friendship.requesterId;

        const sendMessage = new SendMessageService();
        const message = await sendMessage.execute({
          content,
          senderId: userId,
          receiverId,
          friendId,
        });

        const senderUser = await prismaClient.user.findUnique({
          where: {
            id: userId
          },
          select: {
            id: true,
            username: true
          },
        });

        const messageWithSender = {
          ...message,
          sender: senderUser,
        };

        io.to(receiverId).emit("directMessage", messageWithSender);
        io.to(userId).emit("messageSent", messageWithSender);

        logger.info({ userId, receiverId, friendId }, "Mensagem enviada com sucesso");
      } catch (err) {
        logger.error({ err, userId, friendId }, "Erro ao enviar mensagem");
        socket.emit("error", "Erro ao enviar mensagem!");
      }
    });

    socket.on("messagesRead", async ({ friendId }) => {
      try {
        if (!friendId) {
          return;
        }

        await prismaClient.directMessage.updateMany({
          where: {
            friendId,
            receiverId: userId,
            read: false,
          },
          data: {
            read: true
          },
        });

        logger.info({ userId, friendId }, "Mensagens marcadas como lidas");

      } catch (err) {
        logger.error({ err, userId, friendId }, "Erro ao marcar mensagens como lidas");
      }
    });

    socket.on(
      "sendFriendRequest",
      async ({ addresseeEmail }, callback) => {
        try {
          if (!callback) {
            callback = () => { };
          }

          const addressee = await prismaClient.user.findUnique({
            where: { email: addresseeEmail },
          });

          if (!addressee) {
            return callback({
              success: false,
              message: "Usuário não encontrado!",
            });
          }

          if (addressee.id === userId) {
            return callback({
              success: false,
              message: "Você não pode adicionar a si mesmo!",
            });
          }

          const existing = await prismaClient.friend.findFirst({
            where: {
              OR: [
                { requesterId: userId, addresseeId: addressee.id },
                { requesterId: addressee.id, addresseeId: userId },
              ],
            },
          });

          if (existing) {
            return callback({
              success: false,
              message: "Pedido já existente.",
            });
          }

          const newRequest = await prismaClient.friend.create({
            data: {
              requesterId: userId,
              addresseeId: addressee.id,
              status: "PENDING",
            },
            include: {
              requester: { select: { id: true, username: true, email: true } },
            },
          });

          io.to(addressee.id).emit("friendRequestReceived", newRequest);

          socket.emit("friendRequestSent", newRequest);

          logger.info(
            { requesterId: userId, addresseeId: addressee.id },
            "Solicitação de amizade enviada"
          );

          return callback({
            success: true,
            message: "Pedido enviado com sucesso!",
          });

        } catch (err) {
          logger.error(
            { err, userId, addresseeEmail },
            "Erro ao enviar pedido de amizade"
          );

          return callback({
            success: false,
            message: "Erro interno ao enviar pedido",
          });
        }
      }
    );


    socket.on("updateFriendRequest", async ({ friendId, action }) => {
      try {
        const friendship = await prismaClient.friend.findUnique({
          where: { id: friendId },
        });

        if (!friendship) {
          return socket.emit("error", "Pedido não encontrado!");
        }

        if (friendship.addresseeId !== userId)
          return socket.emit("error", "Você não pode alterar este pedido!");

        let updated;

        if (action === "accept") {
          updated = await prismaClient.friend.update({
            where: { id: friendId },
            data: { status: "ACCEPTED" },
            include: {
              requester: { select: { id: true, username: true, email: true } },
              addressee: { select: { id: true, username: true, email: true } },
            },
          });

          const friendForRequester = {
            id: updated.id,
            friendId: updated.addressee.id,
            username: updated.addressee.username,
            status: updated.status,
          };

          const friendForAddressee = {
            id: updated.id,
            friendId: updated.requester.id,
            username: updated.requester.username,
            status: updated.status,
          };

          io.to(friendship.requesterId).emit(
            "friendRequestAccepted",
            friendForRequester
          );
          io.to(friendship.addresseeId).emit(
            "friendRequestAccepted",
            friendForAddressee
          );
        } else if (action === "reject") {
          updated = await prismaClient.friend.delete({
            where: { id: friendId },
          });

          io.to(friendship.requesterId).emit("friendRequestRejected", updated);
        }

        socket.emit("friendRequestUpdated", updated);

        logger.info({ userId, friendId, action }, "Pedido de amizade atualizado");
      } catch (err) {
        logger.error(
          { err, userId, friendId, action },
          "Erro ao atualizar pedido de amizade"
        );
      }
    });

    socket.on("disconnect", () => {
      logger.info({ userId }, "Usuário desconectado");
    });
  });
}
