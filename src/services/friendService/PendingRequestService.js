"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingRequestService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../prisma");
class PendingRequestService {
    async execute({ user_id }) {
        const pendingRequests = await prisma_1.prismaClient.friend.findMany({
            where: {
                addresseeId: user_id,
                status: client_1.FriendStatus.PENDING,
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    }
                }
            }
        });
        const count = pendingRequests.length;
        return { pendingRequests, count };
    }
}
exports.PendingRequestService = PendingRequestService;
//# sourceMappingURL=PendingRequestService.js.map