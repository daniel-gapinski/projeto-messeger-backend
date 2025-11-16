declare class GetUserService {
    execute(user_id: string): Promise<{
        email: string;
        username: string;
        id: string;
    } | null>;
}
export { GetUserService };
//# sourceMappingURL=GetUserService.d.ts.map