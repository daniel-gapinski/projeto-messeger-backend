interface UserProps {
    email: string;
    password: string;
    username: string;
}
declare class CreateUserService {
    execute({ email, password, username }: UserProps): Promise<{
        email: string;
        username: string;
        id: string;
    }>;
}
export { CreateUserService };
//# sourceMappingURL=CreateUserService.d.ts.map