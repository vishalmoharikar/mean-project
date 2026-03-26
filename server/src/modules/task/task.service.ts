import { CreateTaskDto } from './task.validator';
import { TaskRepository } from "./task.repo";
import { injectable, inject } from "tsyringe";
import { cacheGet, cacheSet, cacheDeletePattern } from '../../infra/cache/task.cache.helper';
import { publishEvent } from "../../infra/rabbitmq/publisher";
import { NotificationService } from '../../services/notification.service';
import { Logger } from '../../utils/logger';


@injectable()
export class TaskService {
    constructor(
        @inject(TaskRepository) private repo: TaskRepository
    ) { }



    async createTask(userId: string, createTaskDto: CreateTaskDto) {
        const task = await this.repo.create({ userId, ...createTaskDto });
        const pattern = `tasks:${userId}:*`;
        await cacheDeletePattern(pattern);
        await publishEvent("task.created", {
            taskId: task._id.toString(),
            title: task.title,
            userId: task.userId.toString(),
        });
        NotificationService.notifyUser(task.userId, "task.created", task);
        Logger.info("Task created", {
            taskId: task._id,
            userId: task.userId,
        });

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