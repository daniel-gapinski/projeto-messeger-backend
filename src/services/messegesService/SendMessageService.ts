import { prismaClient } from "../../prisma";

interface SendMessageProps {
    content: string;
    senderId: string;
    receiverId: string;
    friendId: string;
}

class SendMessageService {

    async execute({ content, senderId, receiverId, friendId }: SendMessageProps) {

        if (!content.trim()) {
            throw new Error("Conteúdo vazio!");
        }

        if (!senderId || !receiverId) {
            throw new Error("Remetente ou destinatário inválido!");
        }

        const friend = await prismaClient.friend.findFirst({
            where: {
                id: friendId,
            },
        });

        if (!friend) {
            throw new Error("Amizade não encontrada entre usuários!");
        }

        const message = await prismaClient.directMessage.create({
            data: {
                content,
                senderId,
                receiverId,
                friendId: friend.id,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });

        return message;
    }
}

export { SendMessageService }
