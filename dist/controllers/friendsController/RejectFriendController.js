"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectFriendController = void 0;
const RejectFriendService_1 = require("../../services/friendService/RejectFriendService");
class RejectFriendController {
    async handle(req, res) {
        const user_id = req.user_id;
        const friendshipId = req.query.friendshipId;
        const rejectFriend = new RejectFriendService_1.RejectFriendService();
        const reject = await rejectFriend.execute({
            user_id,
            id: friendshipId,
        });
        return res.json(reject);
    }
}
exports.RejectFriendController = RejectFriendController;
//# sourceMappingURL=RejectFriendController.js.map