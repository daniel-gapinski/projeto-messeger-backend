"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFriendService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../prisma");
class AddFriendService {
    async execute({ requesterId, addresseeEmail }) {
        const addressee = await prisma_1.prismaClient.user.findUnique({
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
        const friendshipExists = await prisma_1.prismaClient.friend.findFirst({
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
            if (friendshipExists.status === client_1.FriendStatus.ACCEPTED) {
                throw new Error("Vocês já são anigos!");
            }
            else if (friendshipExists.status === client_1.FriendStatus.PENDING) {
                throw new Error("Já existe um pepdido de amizade pendente!");
            }
            else {
                throw new Error("Usuário não encontrado!");
            }
        }
        const friendship = await prisma_1.prismaClient.friend.create({
            data: {
                requesterId,
                addresseeId: addressee.id,
                status: client_1.FriendStatus.PENDING,
            },
        });
        return friendship;
    }
}
exports.AddFriendService = AddFriendService;
//# sourceMappingURL=AddFriendService.js.map