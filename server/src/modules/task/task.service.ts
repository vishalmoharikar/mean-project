import { TaskRepository } from "./task.repo";

export class TaskService {
    repo = new TaskRepository();

    async createTask(userId: string, title: string) {
        return this.repo.create({ userId, title });
    }

    async getTasks(userId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.repo.findByUser(userId, skip, limit);
    }
}