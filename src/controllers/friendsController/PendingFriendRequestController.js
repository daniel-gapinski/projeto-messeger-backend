"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingFriendRequestController = void 0;
const PendingRequestService_1 = require("../../services/friendService/PendingRequestService");
class PendingFriendRequestController {
    async handle(req, res) {
        const user_id = req.user_id;
        const pendingRequest = new PendingRequestService_1.PendingRequestService();
        const pending = await pendingRequest.execute({
            user_id,
        });
        return res.json(pending);
    }
}
exports.PendingFriendRequestController = PendingFriendRequestController;
//# sourceMappingURL=PendingFriendRequestController.js.map