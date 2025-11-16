interface UserProps {
    email: string;
    password: string;
}
declare class AuthUserService {
    execute({ email, password }: UserProps): Promise<{
        id: string;
        email: string;
        username: string;
        token: string;
    }>;
}
export { AuthUserService };
//# sourceMappingURL=AuthUserService.d.ts.map