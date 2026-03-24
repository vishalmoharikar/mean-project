import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { container } from "tsyringe";
import { validateCreateTask } from "./task.validator";

const service = container.resolve(TaskService);

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