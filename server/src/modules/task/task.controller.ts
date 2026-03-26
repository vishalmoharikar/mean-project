import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { container } from "tsyringe";
import { validateCreateTask } from "./task.validator";
import { FileService } from "../file/file.service";
import { publishEvent } from "../../infra/rabbitmq/publisher";


const service = container.resolve(TaskService);
const fileService = container.resolve(FileService);

export const createTaskWithFile = async (req: any, res: Response) => {
    try {
        const { title } = req.body;

        if (!title || title.length < 3) {
            throw new Error("Invalid title");
        }

        const validatedData = validateCreateTask(req.body);

        const task = await service.createTask(
            req.user.id,
            validatedData
        );


        let fileUrl: string | undefined;

        if (req.file) {
            const result = await fileService.uploadFileAndPublish({
                taskId: task._id.toString(),
                file: req.file,
                userId: req.user.id,
            });

            fileUrl = result.fileUrl;
        }
        res.json({
            ...task.toObject?.() ?? task,
            fileUrl,
        });

    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export const createTask = async (req: any, res: Response) => {

    const validatedData = validateCreateTask(req.body);
    const task = await service.createTask(req.user.id, validatedData);


    res.json(task);

};

export const getTasks = async (req: any, res: Response) => {

    const page = Number(req.query.page) || 1;
    const tasks = await service.getTasks(req.user.id, page);
    res.json(tasks);

};