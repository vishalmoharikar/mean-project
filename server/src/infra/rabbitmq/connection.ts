import amqp from "amqplib";
import { rabbitConfig } from "../../core/config/rabbitmq";

let channel: amqp.Channel;

export const connectRabbit = async () => {
    const conn = await amqp.connect(rabbitConfig.url); // correct type inferred

    channel = await conn.createChannel();

    await channel.assertExchange(rabbitConfig.exchange, "topic", {
        durable: true,
    });

    console.log("RabbitMQ connected");
};

export const getChannel = () => {
    if (!channel) throw new Error("RabbitMQ not initialized");
    return channel;
};