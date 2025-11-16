"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountUnreadService = void 0;
const prisma_1 = require("../../prisma");
class CountUnreadService {
    async execute({ user_id, friendId }) {
        await prisma_1.prismaClient.directMessage.findFirst({
            where: {
                friendId,
                OR: [
                    { senderId: user_id },
                    { receiverId: user_id },
                ],
            },
        });
        const countUnreadMessages = await prisma_1.prismaClient.directMessage.count({
            where: {
                friendId,
                read: false,
                NOT: {
                    senderId: user_id
                },
            },
        });
        return countUnreadMessages;
    }
}
exports.CountUnreadService = CountUnreadService;
//# sourceMappingURL=CountUnreadService.js.map