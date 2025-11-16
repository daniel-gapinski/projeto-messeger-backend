"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFriendsController = void 0;
const GetFriendsService_1 = require("../../services/friendService/GetFriendsService");
class GetFriendsController {
    async handle(req, res) {
        const user_id = req.user_id;
        const getFriends = new GetFriendsService_1.GetFriendsService();
        const friends = await getFriends.execute({
            user_id,
        });
        return res.json(friends);
    }
}
exports.GetFriendsController = GetFriendsController;
//# sourceMappingURL=GetFriendsController.js.map