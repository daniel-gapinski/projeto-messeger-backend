import { Request, Response } from "express";
import { CountUnreadService } from "../../services/messegesService/CountUnreadService";

class CountUnreadController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { friendId } = req.params;
        
        const countMessages = new CountUnreadService();

        const messages = await countMessages.execute({
            user_id,
            friendId: friendId as string,
        });

        return res.json({unreadCount: messages});
    }
}

export { CountUnreadController };