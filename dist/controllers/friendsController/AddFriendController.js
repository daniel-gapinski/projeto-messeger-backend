"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFriendController = void 0;
const AddFriendService_1 = require("../../services/friendService/AddFriendService");
class AddFriendController {
    async handle(req, res) {
        const requesterId = req.user_id;
        const { email: addresseeEmail } = req.body;
        const addFriend = new AddFriendService_1.AddFriendService();
        const friend = await addFriend.execute({
            requesterId,
            addresseeEmail,
        });
        return res.json(friend);
    }
}
exports.AddFriendController = AddFriendController;
//# sourceMappingURL=AddFriendController.js.map