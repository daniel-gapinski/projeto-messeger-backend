import { prismaClient } from "../../prisma";

interface ReadMessageProps {
    user_id: string;
    friendId: string;
}

class ReadMessageService {

    async execute({ user_id, friendId }: ReadMessageProps) {
        
        if(!user_id || !friendId) {
            throw new Error("Parâmetros inválidos!");
        }

        const updateMessages = prismaClient.directMessage.updateMany({
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

export { ReadMessageService }