export class Logger {
    static info(message: string, meta?: any) {
        console.log(JSON.stringify({
            level: "info",
            message,
            meta,
            timestamp: new Date().toISOString(),
        }));
    }

    static error(message: string, error?: any) {
        console.error(JSON.stringify({
            level: "error",
            message,
            error,
            timestamp: new Date().toISOString(),
        }));
    }
}