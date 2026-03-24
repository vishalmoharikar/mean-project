import { containerClient } from "../../core/config/blob";

export class FileService {
    async uploadFile(file: Express.Multer.File) {
        const fileName = `${Date.now()}-${file.originalname}`;

        const blockBlobClient =
            containerClient.getBlockBlobClient(fileName);

        await blockBlobClient.uploadData(file.buffer);

        return blockBlobClient.url;
    }
}