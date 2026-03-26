import { handleEvent } from "../../consumers/event.handlers";
import { rabbitConfig } from "../../core/config/rabbitmq";
import { getChannel } from "./connection";

export const startConsumers = async () => {
    const channel = getChannel();

    const queues = Object.values(rabbitConfig.queues);

    for (const queue of queues) {
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, rabbitConfig.exchange, queue);

        channel.consume(queue, async (msg) => {
            if (!msg) return;

            const content = JSON.parse(msg.content.toString());

            try {
                console.log("Consumed:", queue, content);
                const routingKey = msg.fields.routingKey;

                // handle logic (email/log/notification)
                await handleEvent(routingKey, content);

                channel.ack(msg);
            } catch (err) {
                console.error(err);
                channel.nack(msg);
            }
        });
    }
};