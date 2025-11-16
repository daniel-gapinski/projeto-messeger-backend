import { Request, Response } from "express";
import { GetMessagesService } from "../../services/messegesService/GetMessagesService";

class GetMessagesController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { conversationId } = req.params;

        if(!conversationId) {
            throw new Error("Conversa não encontrada!");
            
        }

        const getMessages = new GetMessagesService();

        const messages = await getMessages.execute({
            user_id,
            conversationId: conversationId as string,
        });

        return res.json(messages);
    }
}

export { GetMessagesController }
