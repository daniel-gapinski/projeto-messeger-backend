"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/userService/CreateUserService");
class CreateUserController {
    async handle(req, res) {
        const { email, password, username } = req.body;
        const userService = new CreateUserService_1.CreateUserService();
        const user = await userService.execute({
            email,
            password,
            username,
        });
        return res.json(user);
    }
    ;
}
exports.CreateUserController = CreateUserController;
;
//# sourceMappingURL=CreateUserController.js.map