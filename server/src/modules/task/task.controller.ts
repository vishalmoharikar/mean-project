import { Request, Response } from "express";
import { TaskService } from "./task.service";

const service = new TaskService();

export const createTask = async (req: any, res: Response) => {
    try {
        const task = await service.createTask(req.user.id, req.body.title);
        res.json(task);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export const getTasks = async (req: any, res: Response) => {
    const page = Number(req.query.page) || 1;
    const tasks = await service.getTasks(req.user.id, page);
    res.json(tasks);
};