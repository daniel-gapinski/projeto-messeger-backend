"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const GetUserService_1 = require("../../services/userService/GetUserService");
class GetUserController {
    async handle(req, res) {
        const user_id = req.user_id;
        const userDetail = new GetUserService_1.GetUserService();
        const user = await userDetail.execute(user_id);
        return res.json(user);
    }
}
exports.GetUserController = GetUserController;
//# sourceMappingURL=GetUserController.js.map