import { GetFriendsService } from "../../services/friendService/GetFriendsService";
import { Request, Response } from "express";

class GetFriendsController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        
        const getFriends = new GetFriendsService();

        const friends = await getFriends.execute({
            user_id,
        });

        return res.json(friends);
    }
}

export { GetFriendsController }