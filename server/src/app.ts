import "reflect-metadata";
import express from "express";
import { connectDB } from "./infra/db/mongo";
import { config } from "./core/config/config";
import { register, login } from "./modules/auth/auth.controller";
import { authMiddleware } from "./core/middleware/auth";
import { createTask, getTasks } from "./modules/task/task.controller";
import "reflect-metadata";
import { errorHandler } from "./core/middleware/errorHandler";


const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.send("OK"));

app.post("/register", register);
app.post("/login", login);

app.get("/me", authMiddleware, (req: any, res) => {
    res.json(req.user);
});

app.post("/tasks", authMiddleware, createTask);
app.get("/tasks", authMiddleware, getTasks);

app.use(errorHandler);
connectDB().then(() => {
    app.listen(config.port, () =>
        console.log(`Server running on ${config.port}`)
    );
});