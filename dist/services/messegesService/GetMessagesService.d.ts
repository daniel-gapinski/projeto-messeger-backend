interface GetMessagesProps {
    user_id: string;
    conversationId: string;
}
declare class GetMessagesService {
    execute({ conversationId, user_id }: GetMessagesProps): Promise<{
        messages: ({
            sender: {
                email: string;
                username: string;
                id: string;
            };
            receiver: {
                email: string;
                username: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            content: string;
            senderId: string;
            receiverId: string;
            friendId: string;
            read: boolean;
        })[];
        friend: {
            email: string;
            username: string;
            id: string;
        } | undefined;
    } | undefined>;
}
export { GetMessagesService };
//# sourceMappingURL=GetMessagesService.d.ts.map