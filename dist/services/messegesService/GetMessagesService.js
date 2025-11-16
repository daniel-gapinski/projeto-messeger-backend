"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessagesService = void 0;
const prisma_1 = require("../../prisma");
class GetMessagesService {
    async execute({ conversationId, user_id }) {
        const messages = await prisma_1.prismaClient.directMessage.findMany({
            where: {
                friendId: conversationId,
            },
            include: {
                receiver: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
                sender: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        if (!messages) {
            return;
        }
        const firstMessage = messages[0];
        const friend = firstMessage?.sender.id === user_id ? firstMessage.receiver : firstMessage?.sender;
        return { messages, friend };
    }
}
exports.GetMessagesService = GetMessagesService;
//# sourceMappingURL=GetMessagesService.js.map