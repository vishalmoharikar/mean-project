import { CreateTaskDto } from './task.validator';
import { TaskRepository } from "./task.repo";
import { injectable, inject } from "tsyringe";

@injectable()

export class TaskService {
    constructor(
        @inject(TaskRepository) private repo: TaskRepository
    ) { }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {
        return this.repo.create({ userId, ...createTaskDto });
    }

    async getTasks(userId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.repo.findByUser(userId, skip, limit);
    }
}