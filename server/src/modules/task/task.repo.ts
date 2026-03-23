import { Task } from "./task.model";

export class TaskRepository {
    create(data: any) {
        return Task.create(data);
    }

    findByUser(userId: string, skip: number, limit: number) {
        return Task.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }
}