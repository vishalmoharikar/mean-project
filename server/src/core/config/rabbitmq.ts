export const rabbitConfig = {
    url: process.env.RABBITMQ_URL || "amqp://localhost",
    exchange: "task_exchange",
    queues: {
        taskCreated: "task.created",
        fileUploaded: "task.file_uploaded",
    },
};