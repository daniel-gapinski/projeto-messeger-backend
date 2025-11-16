import { FriendStatus } from "@prisma/client";
import { prismaClient } from "../../prisma";

class PendingRequestService {

    async execute({ user_id }: { user_id: string }) {

        const pendingRequests = await prismaClient.friend.findMany({
            where: {
                addresseeId: user_id,
                status: FriendStatus.PENDING,
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

export { PendingRequestService };