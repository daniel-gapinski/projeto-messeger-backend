interface SendMessageProps {
    content: string;
    senderId: string;
    receiverId: string;
    friendId: string;
}
declare class SendMessageService {
    execute({ content, senderId, receiverId, friendId }: SendMessageProps): Promise<{
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
    }>;
}
export { SendMessageService };
//# sourceMappingURL=SendMessageService.d.ts.map