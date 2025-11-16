import { prismaClient } from "../../prisma";
import { FriendStatus } from "@prisma/client";

interface FriendsProps {
  user_id: string;
}

class GetFriendsService {
  async execute({ user_id }: FriendsProps) {
    const friends = await prismaClient.friend.findMany({
      where: {
        status: FriendStatus.ACCEPTED,
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

export { GetFriendsService };
