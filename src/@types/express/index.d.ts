declare namespace Express {
    export interface Request {
        user_id: string;
    }

    export interface JWTPayload {
        userId_socket: string;
    }
}