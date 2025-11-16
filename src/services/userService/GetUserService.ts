import { prismaClient } from "../../prisma/index";

class GetUserService {

    async execute(user_id: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        return user;
    }
}

export { GetUserService }
