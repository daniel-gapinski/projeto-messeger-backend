interface UnreadMessagesProps {
    user_id: string;
    friendId: string;
}
declare class CountUnreadService {
    execute({ user_id, friendId }: UnreadMessagesProps): Promise<number>;
}
export { CountUnreadService };
//# sourceMappingURL=CountUnreadService.d.ts.map