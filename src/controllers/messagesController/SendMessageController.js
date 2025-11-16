"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageController = void 0;
const SendMessageService_1 = require("../../services/messegesService/SendMessageService");
const prisma_1 = require("../../prisma");
class SendMessageController {
    async handle(req, res) {
        const { content } = req.body;
        const senderId = req.user_id;
        const { friendId } = req.query;
        if (!content) {
            throw new Error("Insira uma mensagem!");
        }
        if (!friendId || !senderId) {
            throw new Error("Dados de usuários inválidos!");
        }
        const friendship = await prisma_1.prismaClient.friend.findUnique({
            where: { id: friendId },
        });
        if (!friendship) {
            throw new Error("Amizade não encontrada!");
        }
        const receiverId = friendship.requesterId === senderId ? friendship.addresseeId : friendship.requesterId;
        const sendMessage = new SendMessageService_1.SendMessageService();
        const message = await sendMessage.execute({
            content,
            senderId,
            receiverId,
            friendId,
        });
        const senderUser = await prisma_1.prismaClient.user.findUnique({
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
exports.SendMessageController = SendMessageController;
//# sourceMappingURL=SendMessageController.js.map