import mongoose, { Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    userId: string;
    fileUrl?: string;
}

const taskSchema = new mongoose.Schema<ITask>(
    {
        title: { type: String, required: true },
        userId: { type: String, index: true },
        fileUrl: { type: String },  
    },
    { timestamps: true }
);

taskSchema.index({ userId: 1, createdAt: -1 });

export const Task = mongoose.model<ITask>("Task", taskSchema);