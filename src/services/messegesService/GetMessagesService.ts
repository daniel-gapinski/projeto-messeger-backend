import { prismaClient } from "../../prisma";

interface GetMessagesProps {
    user_id: string;
    conversationId: string;
}

class GetMessagesService {

    async execute ({ conversationId, user_id }: GetMessagesProps) {
        
        const messages = await prismaClient.directMessage.findMany({
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

        if(!messages) {
            return;
        }

        const firstMessage = messages[0];
        const friend = firstMessage?.sender.id === user_id ? firstMessage.receiver : firstMessage?.sender;

        return { messages, friend };
    }
}

export { GetMessagesService }