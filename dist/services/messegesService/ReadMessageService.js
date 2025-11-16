"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadMessageService = void 0;
const prisma_1 = require("../../prisma");
class ReadMessageService {
    async execute({ user_id, friendId }) {
        if (!user_id || !friendId) {
            throw new Error("Parâmetros inválidos!");
        }
        const updateMessages = prisma_1.prismaClient.directMessage.updateMany({
            where: {
                friendId,
                receiverId: user_id,
                read: false,
            },
            data: {
                read: true,
            },
        });
        return updateMessages;
    }
}
exports.ReadMessageService = ReadMessageService;
//# sourceMappingURL=ReadMessageService.js.map