"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
const index_1 = require("../../prisma/index");
class GetUserService {
    async execute(user_id) {
        const user = await index_1.prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });
        return user;
    }
}
exports.GetUserService = GetUserService;
//# sourceMappingURL=GetUserService.js.map