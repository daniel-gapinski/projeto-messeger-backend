"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountUnreadController = void 0;
const CountUnreadService_1 = require("../../services/messegesService/CountUnreadService");
class CountUnreadController {
    async handle(req, res) {
        const user_id = req.user_id;
        const { friendId } = req.params;
        const countMessages = new CountUnreadService_1.CountUnreadService();
        const messages = await countMessages.execute({
            user_id,
            friendId: friendId,
        });
        return res.json({ unreadCount: messages });
    }
}
exports.CountUnreadController = CountUnreadController;
//# sourceMappingURL=CountUnreadController.js.map