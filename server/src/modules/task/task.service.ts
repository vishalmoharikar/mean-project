import { CreateTaskDto } from './task.validator';
import { TaskRepository } from "./task.repo";
import { injectable, inject } from "tsyringe";
import { cacheGet, cacheSet, cacheDeletePattern } from '../../infra/cache/task.cache.helper';


@injectable()
export class TaskService {
    constructor(
        @inject(TaskRepository) private repo: TaskRepository
    ) { }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {
        const task = this.repo.create({ userId, ...createTaskDto });
        const pattern = `tasks:${userId}:*`;
        await cacheDeletePattern(pattern);
        return task;
    }

    async getTasks(userId: string, page = 1, limit = 10) {
        const key = `tasks:${userId}:${page}`;

        const cached = await cacheGet(key);
        if (cached) {
            console.log("Cache HIT");
            return cached;
        }

        const skip = (page - 1) * limit;
        const tasks = await this.repo.findByUser(userId, skip, limit);
        await cacheSet(key, tasks);
        console.log("Cache MISS");

        return tasks;
    }
}