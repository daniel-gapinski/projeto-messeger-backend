import { prismaClient } from "../../prisma";

interface UnreadMessagesProps {
    user_id: string;
    friendId: string;
}

class CountUnreadService {
    async execute({ user_id, friendId }: UnreadMessagesProps) {

        await prismaClient.directMessage.findFirst({
            where: {
                friendId,
                OR: [
                    { senderId: user_id },
                    { receiverId: user_id },
                ],
            },
        });

        const countUnreadMessages = await prismaClient.directMessage.count({
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

export { CountUnreadService };
