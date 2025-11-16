interface RejectFriendProps {
    id: string;
    user_id: string;
}
declare class RejectFriendService {
    execute({ id, user_id }: RejectFriendProps): Promise<{
        message: string;
    }>;
}
export { RejectFriendService };
//# sourceMappingURL=RejectFriendService.d.ts.map