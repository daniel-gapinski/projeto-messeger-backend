import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { socketHandle } from "./sockets/socketHandle";
import { logger } from "./logger";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor!",
    });
});

socketHandle(io);

server.listen(process.env.PORT, () => {
    logger.info("Servidor rodando!");
});


