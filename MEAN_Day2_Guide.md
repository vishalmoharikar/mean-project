# MEAN Project – Day 2 (Layering + Task Module)

## Goal
- Proper architecture (Controller → Service → Repository)
- Task module (CRUD)
- Pagination + indexing
- Clean separation of concerns

---

## 1. Folder Structure Update

```
src/
  modules/
    task/
      task.model.ts
      task.repo.ts
      task.service.ts
      task.controller.ts
```

---

## 2. Task Model

```ts
import mongoose, { Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  userId: string;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    userId: { type: String, index: true }
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
```

---

## 3. Repository Layer (DB only)

```ts
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
```

---

## 4. Service Layer (business logic)

```ts
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
```

---

## 5. Controller Layer

```ts
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
```

---

## 6. Routes (update app.ts)

```ts
import { createTask, getTasks } from "./modules/task/task.controller";

app.post("/tasks", authMiddleware, createTask);
app.get("/tasks", authMiddleware, getTasks);
```

---

## 7. Test Flow

### Create Task
```
POST /tasks
Authorization: Bearer <token>
{
  "title": "Learn MEAN"
}
```

### Get Tasks
```
GET /tasks?page=1
Authorization: Bearer <token>
```

---

## Expected Output

- Tasks created per user
- Pagination working
- Sorted by latest first

---

## Key Learning

- Controller → handles HTTP
- Service → business logic
- Repository → DB only

---

## Common Mistakes

- Putting DB calls in controller ❌
- No pagination ❌
- Not filtering by userId ❌

---

End of Day 2
