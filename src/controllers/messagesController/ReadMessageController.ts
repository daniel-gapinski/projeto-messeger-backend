import { Request, Response } from "express";
import { ReadMessageService } from "../../services/messegesService/ReadMessageService";

class ReadMessageController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const friendId  = req.query.friendId as string;

        const readMessage = new ReadMessageService();

        const read = await readMessage.execute({
            friendId: friendId!,
            user_id,
        });

        return res.json(read);
    }
}

export { ReadMessageController }