"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageService = void 0;
const prisma_1 = require("../../prisma");
class SendMessageService {
    async execute({ content, senderId, receiverId, friendId }) {
        if (!content.trim()) {
            throw new Error("Conteúdo vazio!");
        }
        if (!senderId || !receiverId) {
            throw new Error("Remetente ou destinatário inválido!");
        }
        const friend = await prisma_1.prismaClient.friend.findFirst({
            where: {
                id: friendId,
            },
        });
        if (!friend) {
            throw new Error("Amizade não encontrada entre usuários!");
        }
        const message = await prisma_1.prismaClient.directMessage.create({
            data: {
                content,
                senderId,
                receiverId,
                friendId: friend.id,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });
        return message;
    }
}
exports.SendMessageService = SendMessageService;
//# sourceMappingURL=SendMessageService.js.map