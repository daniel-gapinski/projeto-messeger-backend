"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const index_1 = require("../../prisma/index");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        if (!email || !password) {
            throw new Error("Preencha todos os campos!");
        }
        const user = await index_1.prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new Error("E-mail ou senha incorretos!");
        }
        const passwordMatch = await (0, bcrypt_1.compare)(password, user?.password);
        if (!passwordMatch) {
            throw new Error("E-mail ou senha incorretos!");
        }
        const token = (0, jsonwebtoken_1.sign)({
            email: user.email,
            username: user.username,
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "30d",
        });
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            token: token,
        };
    }
}
exports.AuthUserService = AuthUserService;
//# sourceMappingURL=AuthUserService.js.map