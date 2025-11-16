"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessagesController = void 0;
const GetMessagesService_1 = require("../../services/messegesService/GetMessagesService");
class GetMessagesController {
    async handle(req, res) {
        const user_id = req.user_id;
        const { conversationId } = req.params;
        if (!conversationId) {
            throw new Error("Conversa não encontrada!");
        }
        const getMessages = new GetMessagesService_1.GetMessagesService();
        const messages = await getMessages.execute({
            user_id,
            conversationId: conversationId,
        });
        return res.json(messages);
    }
}
exports.GetMessagesController = GetMessagesController;
//# sourceMappingURL=GetMessagesController.js.map