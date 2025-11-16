"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const index_1 = require("../../prisma/index");
const bcrypt_1 = require("bcrypt");
class CreateUserService {
    async execute({ email, password, username }) {
        if (!email) {
            throw new Error("E-mail incorreto!");
        }
        else if (!username) {
            throw new Error("O campo nome é obrigatório");
        }
        const userAlreadyExists = await index_1.prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userAlreadyExists) {
            throw new Error("Usuário já existe!");
        }
        const usernameAlreadyInUse = await index_1.prismaClient.user.findFirst({
            where: {
                username: username,
            },
        });
        if (usernameAlreadyInUse) {
            throw new Error("Nome de usuário já está sendo usado!");
        }
        const passwordHash = await (0, bcrypt_1.hash)(password, 8);
        const user = await index_1.prismaClient.user.create({
            data: {
                email: email,
                password: passwordHash,
                username: username,
            },
            select: {
                id: true,
                email: true,
                username: true,
            }
        });
        return user;
    }
    ;
}
exports.CreateUserService = CreateUserService;
;
//# sourceMappingURL=CreateUserService.js.map