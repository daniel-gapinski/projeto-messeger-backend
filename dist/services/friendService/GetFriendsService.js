"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFriendsService = void 0;
const prisma_1 = require("../../prisma");
const client_1 = require("@prisma/client");
class GetFriendsService {
    async execute({ user_id }) {
        const friends = await prisma_1.prismaClient.friend.findMany({
            where: {
                status: client_1.FriendStatus.ACCEPTED,
                OR: [
                    { requesterId: user_id },
                    { addresseeId: user_id },
                ],
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                addressee: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
        const formatted = friends.map(friend => {
            const isRequester = friend.requesterId === user_id;
            const friendUser = isRequester ? friend.addressee : friend.requester;
            return {
                id: friend.id,
                friendId: friendUser.id,
                username: friendUser.username,
                status: friend.status,
            };
        });
        return formatted;
    }
}
exports.GetFriendsService = GetFriendsService;
//# sourceMappingURL=GetFriendsService.js.map