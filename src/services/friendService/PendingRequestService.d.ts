declare class PendingRequestService {
    execute({ user_id }: {
        user_id: string;
    }): Promise<{
        pendingRequests: ({
            requester: {
                email: string;
                username: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            requesterId: string;
            addresseeId: string;
            status: import("@prisma/client").$Enums.FriendStatus;
        })[];
        count: number;
    }>;
}
export { PendingRequestService };
//# sourceMappingURL=PendingRequestService.d.ts.map