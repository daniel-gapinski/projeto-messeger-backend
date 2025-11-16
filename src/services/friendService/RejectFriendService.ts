import { FriendStatus } from "@prisma/client";
import { prismaClient } from "../../prisma";

interface RejectFriendProps {
    id: string,
    user_id: string,
}

class RejectFriendService {

    async execute({ id, user_id }: RejectFriendProps) {
        const friendRequest = await prismaClient.friend.findFirst({
            where: {
                id,
                addresseeId: user_id,
                status: FriendStatus.PENDING,
            },
        });

        if (!friendRequest) {
            throw new Error("Pedido de amizade não encontrado!");
        }

        await prismaClient.friend.delete({
            where: {
                id,
            },
        });

        return { message: "Pedido de amizade rejeitado com sucesso!" };
    }
}

export { RejectFriendService }
