import { FriendStatus } from "@prisma/client";
import { prismaClient } from "../../prisma";

interface FriendProps {
    requesterId: string;
    addresseeEmail: string;
}

class AddFriendService {
    async execute({ requesterId, addresseeEmail }: FriendProps) {

        const addressee = await prismaClient.user.findUnique({
            where: {
                email: addresseeEmail,
            },
        });

        if (!addressee) {
            throw new Error("Usuário destinatário não encontrado!");
        }

        if (requesterId === addressee.id) {
            throw new Error("Você não pode adicionar a si mesmo!");
        }

        const friendshipExists = await prismaClient.friend.findFirst({
            where: {
                OR: [
                    {
                        requesterId,
                        addresseeId: addressee.id,
                    },
                    {
                        requesterId: addressee.id,
                        addresseeId: requesterId,
                    },
                ],
            },
        });

        if (friendshipExists) {
            if (friendshipExists.status === FriendStatus.ACCEPTED) {
                throw new Error("Vocês já são anigos!");

            } else if (friendshipExists.status === FriendStatus.PENDING) {
                throw new Error("Já existe um pepdido de amizade pendente!");

            } else {
                throw new Error("Usuário não encontrado!");
            }
        }
        const friendship = await prismaClient.friend.create({
            data: {
                requesterId,
                addresseeId: addressee.id,
                status: FriendStatus.PENDING,
            },
        });

        return friendship;
    }
}

export { AddFriendService };
