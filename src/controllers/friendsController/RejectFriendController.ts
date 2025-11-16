import { Request, Response } from "express";
import { RejectFriendService } from "../../services/friendService/RejectFriendService";

class RejectFriendController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const friendshipId = req.query.friendshipId as string;

        const rejectFriend = new RejectFriendService();

        const reject = await rejectFriend.execute({
            user_id,
            id: friendshipId,
        });

        return res.json(reject);
    }
}

export { RejectFriendController }

