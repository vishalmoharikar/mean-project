import { getIO } from "../core/config/socket";

export class NotificationService {
    static notifyUser(userId: string, event: string, payload: any) {
        try {
            const io = getIO();
            console.log(`Vishal -----Emitting event '${event}' to user ${userId}`);
            io.to(userId).emit(event, payload);
        } catch (err: any) {
            console.error("Socket emit skipped:", err.message);
        }
    }

    static broadcast(event: string, payload: any) {
        try {
            const io = getIO();
            io.emit(event, payload);
        } catch (err: any) {
            console.error("Socket emit skipped:", err.message);
        }
    }
}