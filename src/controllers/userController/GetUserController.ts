import { Request, Response } from "express"
import { GetUserService } from "../../services/userService/GetUserService"

class GetUserController {

    async handle(req: Request, res: Response) {

        const user_id =req.user_id;
        
        const userDetail = new GetUserService();

       const user = await userDetail.execute(user_id);

        return res.json(user);
    }
}

export { GetUserController }