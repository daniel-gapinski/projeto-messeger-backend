import { prismaClient } from "../../prisma/index";
import { hash } from "bcrypt";

interface UserProps {
    email: string;
    password: string;
    username: string;
}

class CreateUserService {

    async execute({ email, password, username }: UserProps) {

        if (!email) {
            throw new Error("E-mail incorreto!");

        }else if(!username) {
            throw new Error("O campo nome é obrigatório")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("Usuário já existe!");
        }

        const usernameAlreadyInUse = await prismaClient.user.findFirst({
            where: {
                username: username,
            },
        });

        if(usernameAlreadyInUse) {
            throw new Error("Nome de usuário já está sendo usado!");
            
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                email: email,
                password: passwordHash,
                username: username,
            },
            select: {
                id: true,
                email: true,
                username: true,
            }
        });

        return user;

    };
};

export { CreateUserService };