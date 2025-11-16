import { Request, Response } from "express";
import { AuthUserService } from "../../services/userService/AuthUserService";

class AuthUserController {

    async handle(req: Request, res: Response) {

        const { email, password } = req.body;

        const authUser = new AuthUserService();

        const user = await authUser.execute({
            email,
            password,
        });

        return res.json(user);
    };
}

export { AuthUserController }