interface FriendsProps {
    user_id: string;
}
declare class GetFriendsService {
    execute({ user_id }: FriendsProps): Promise<{
        id: string;
        friendId: string;
        username: string;
        status: import("@prisma/client").$Enums.FriendStatus;
    }[]>;
}
export { GetFriendsService };
//# sourceMappingURL=GetFriendsService.d.ts.map