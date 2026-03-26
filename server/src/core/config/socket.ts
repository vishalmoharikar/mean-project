import { Server } from "socket.io";
import http from "http";

let io: Server | null = null;

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: { origin: "*" },
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket not initialized. Ensure initSocket() is called before usage.");
    }
    return io;
};