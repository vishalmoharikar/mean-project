import { injectable } from "tsyringe";
import { containerClient } from "../../core/config/blob";
import { publishEvent } from "../../infra/rabbitmq/publisher";
import { NotificationService } from "../../services/notification.service";

interface UploadInput {
    taskId: string;
    file: Express.Multer.File;
    userId: string;
}


@injectable()
export class FileService {
   public   async uploadFile(file: Express.Multer.File) {
        const fileName = `${Date.now()}-${file.originalname}`;

        const blockBlobClient =
            containerClient.getBlockBlobClient(fileName);

        await blockBlobClient.uploadData(file.buffer);


        return blockBlobClient.url;
    }

    public async uploadFileAndPublish   ({ taskId, file, userId }: UploadInput) { 
        const fileUrl = await this.uploadFile(file);

        await publishEvent("task.file_uploaded", {
            taskId,
            fileUrl,
            userId,
        }).catch(console.error);

        NotificationService.notifyUser(userId, "file.uploaded", {
            fileName: file.originalname,
            fileUrl,
        });

        return { fileUrl };
    };
}