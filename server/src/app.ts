import "reflect-metadata";
import express from "express";
import { connectDB } from "./infra/db/mongo";
import { config } from "./core/config/config";
import { register, login } from "./modules/auth/auth.controller";
import { authMiddleware } from "./core/middleware/auth";
import { createTask, getTasks, createTaskWithFile } from "./modules/task/task.controller";
import "reflect-metadata";
import { errorHandler } from "./core/middleware/errorHandler";
import { uploadFile } from "./modules/file/file.controller";
import { upload } from "./modules/file/file.middleware";
import { initContainer } from "./core/config/blob";
import { connectRabbit } from "./infra/rabbitmq/connection";
import { startConsumers } from "./infra/rabbitmq/consumer";
import { correlationMiddleware } from "./core/middleware/correlation";


const app = express();
app.use(express.json());
app.use(correlationMiddleware);

app.get("/health", (req, res) => res.send("OK"));

app.post("/register", register);
app.post("/login", login);

app.get("/me", authMiddleware, (req: any, res) => {
    res.json(req.user);
});

app.post("/tasks", authMiddleware, createTask);
app.post("/tasks/upload", authMiddleware, upload.single("file"), createTaskWithFile);
app.get("/tasks", authMiddleware, getTasks);

app.post("/upload", authMiddleware, upload.single("file"), uploadFile);

app.use(errorHandler);
connectDB().then(async () => {
    await initContainer();
   // await connectRabbit();
    
   // await startConsumers();
    app.listen(config.port, () =>
        console.log(`Server running on ${config.port}`)
    );
});
export default app;