"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectFriendService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../prisma");
class RejectFriendService {
    async execute({ id, user_id }) {
        const friendRequest = await prisma_1.prismaClient.friend.findFirst({
            where: {
                id,
                addresseeId: user_id,
                status: client_1.FriendStatus.PENDING,
            },
        });
        if (!friendRequest) {
            throw new Error("Pedido de amizade não encontrado!");
        }
        await prisma_1.prismaClient.friend.delete({
            where: {
                id,
            },
        });
        return { message: "Pedido de amizade rejeitado com sucesso!" };
    }
}
exports.RejectFriendService = RejectFriendService;
//# sourceMappingURL=RejectFriendService.js.map