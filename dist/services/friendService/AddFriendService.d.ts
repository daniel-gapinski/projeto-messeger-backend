interface FriendProps {
    requesterId: string;
    addresseeEmail: string;
}
declare class AddFriendService {
    execute({ requesterId, addresseeEmail }: FriendProps): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requesterId: string;
        addresseeId: string;
        status: import("@prisma/client").$Enums.FriendStatus;
    }>;
}
export { AddFriendService };
//# sourceMappingURL=AddFriendService.d.ts.map