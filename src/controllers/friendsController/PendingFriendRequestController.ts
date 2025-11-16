import { Request, Response } from "express";
import { PendingRequestService } from "../../services/friendService/PendingRequestService"

class PendingFriendRequestController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const pendingRequest = new PendingRequestService();
        const pending = await pendingRequest.execute({
            user_id,
        });

        return res.json (pending);
    }
}

export { PendingFriendRequestController }