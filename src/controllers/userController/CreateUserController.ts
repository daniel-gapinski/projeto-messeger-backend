import { Request, Response } from "express";
import { CreateUserService } from "../../services/userService/CreateUserService";

class CreateUserController {

    async handle(req: Request, res: Response) {

        const { email, password, username } = req.body;

        const userService = new CreateUserService();
        
        const user = await userService.execute({
            email,
            password,
            username,
        });

        return res.json(user)

    };
};

export { CreateUserController }