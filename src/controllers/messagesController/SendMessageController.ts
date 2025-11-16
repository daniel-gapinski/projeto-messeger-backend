import { Request, Response } from "express";
import { SendMessageService } from "../../services/messegesService/SendMessageService";
import { prismaClient } from "../../prisma";

class SendMessageController {
    async handle(req: Request, res: Response) {
        const { content } = req.body;
        const senderId = req.user_id;
        const { friendId } = req.query as { friendId: string };

        if (!content) {
            throw new Error("Insira uma mensagem!");
        }

        if (!friendId || !senderId) {
            throw new Error("Dados de usuários inválidos!");
        }

        const friendship = await prismaClient.friend.findUnique({
            where: { id: friendId },
        });

        if (!friendship) {
            throw new Error("Amizade não encontrada!");
        }

        const receiverId = friendship.requesterId === senderId ? friendship.addresseeId : friendship.requesterId;

        const sendMessage = new SendMessageService();
        const message = await sendMessage.execute({
            content,
            senderId,
            receiverId,
            friendId,
        });

        const senderUser = await prismaClient.user.findUnique({
            where: { id: senderId },
        });

        return res.json({
            ...message,
            sender: {
                id: senderUser?.id,
                username: senderUser?.username,
            },
        });
    }
}

export { SendMessageController };
