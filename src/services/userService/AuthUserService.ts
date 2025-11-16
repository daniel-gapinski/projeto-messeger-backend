import { prismaClient } from "../../prisma/index";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface UserProps {
    email: string;
    password: string;
}


class AuthUserService {

    async execute({ email, password }: UserProps) {
        
        if (!email || !password) {
            throw new Error("Preencha todos os campos!");

        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("E-mail ou senha incorretos!");
        }

        const passwordMatch = await compare(password, user?.password);

        if (!passwordMatch) {
            throw new Error("E-mail ou senha incorretos!");
        }

        const token = sign(
            {
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: "30d",
            }
        );

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            token: token,
        };
    }
}

export { AuthUserService }