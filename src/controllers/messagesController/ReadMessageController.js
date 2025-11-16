"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadMessageController = void 0;
const ReadMessageService_1 = require("../../services/messegesService/ReadMessageService");
class ReadMessageController {
    async handle(req, res) {
        const user_id = req.user_id;
        const friendId = req.query.friendId;
        const readMessage = new ReadMessageService_1.ReadMessageService();
        const read = await readMessage.execute({
            friendId: friendId,
            user_id,
        });
        return res.json(read);
    }
}
exports.ReadMessageController = ReadMessageController;
//# sourceMappingURL=ReadMessageController.js.map