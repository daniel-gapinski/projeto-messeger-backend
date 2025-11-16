import { AddFriendService } from "../../services/friendService/AddFriendService";
import { Request, Response } from "express";

class AddFriendController {
    async handle(req: Request, res: Response) {
        const requesterId = req.user_id;
        const { email: addresseeEmail } = req.body;

        const addFriend = new AddFriendService();

        const friend = await addFriend.execute({
            requesterId,
            addresseeEmail,
        });

        return res.json(friend);
    }
}

export { AddFriendController };
