"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/userService/AuthUserService");
class AuthUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authUser = new AuthUserService_1.AuthUserService();
        const user = await authUser.execute({
            email,
            password,
        });
        return res.json(user);
    }
    ;
}
exports.AuthUserController = AuthUserController;
//# sourceMappingURL=AuthUserController.js.map