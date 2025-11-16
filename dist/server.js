"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const socketHandle_1 = require("./sockets/socketHandle");
const logger_1 = require("./logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor!",
    });
});
(0, socketHandle_1.socketHandle)(io);
server.listen(process.env.PORT, () => {
    logger_1.logger.info("Servidor rodando!");
});
//# sourceMappingURL=server.js.map