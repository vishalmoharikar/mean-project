import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, unique: true, index: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);