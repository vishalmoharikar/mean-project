import { getChannel } from "./connection";
import { rabbitConfig } from "../../core/config/rabbitmq";

export const publishEvent = async (routingKey: string, data: any) => {
    const channel = getChannel();
    console.log(`Publishing now...........`)

    channel.publish(
        rabbitConfig.exchange,
        routingKey,
        Buffer.from(JSON.stringify(data)),
        { persistent: true }
    );
};