import { Request, Response } from "express";
import { FileService } from "./file.service";

const service = new FileService();

export const uploadFile = async (req: any, res: Response) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const url = await service.uploadFile(file);

    res.json({ url });
};