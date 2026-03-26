import http from "http";
import app from "./app";
import { initSocket } from "./core/config/socket";
import { startConsumers } from "./infra/rabbitmq/consumer";
import { connectRabbit } from "./infra/rabbitmq/connection";


const server = http.createServer(app);

const bootstrap = async () => {
    try {
        // 1. Init socket
        initSocket(server);

        // 2. Connect RabbitMQ (CRITICAL)
        await connectRabbit();

        // 3. Start consumers (needs channel)
        await startConsumers();

        // 4. Start server
        server.listen(3000, () => {
            console.log("Server running");
        });

    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }
};

bootstrap();