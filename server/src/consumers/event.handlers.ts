import { NotificationService } from "../services/notification.service";

export const handleEvent = async (routingKey: string, data: any) => {
    switch (routingKey) {
        case "task.created":
            await handleTaskCreated(data);
            break;

        case "file.uploaded":
            await handleFileUploaded(data);
            break;

        default:
            console.log("Unhandled event:", routingKey);
    }
};

const handleTaskCreated = async (data: any) => {
    // business logic (email/log/etc)

    // realtime notification
    NotificationService.notifyUser(data.userId, "task.created", data);
};

const handleFileUploaded = async (data: any) => {
    NotificationService.notifyUser(data.userId, "file.uploaded", data);
};