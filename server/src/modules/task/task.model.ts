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