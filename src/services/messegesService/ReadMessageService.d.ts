interface ReadMessageProps {
    user_id: string;
    friendId: string;
}
declare class ReadMessageService {
    execute({ user_id, friendId }: ReadMessageProps): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
export { ReadMessageService };
//# sourceMappingURL=ReadMessageService.d.ts.map