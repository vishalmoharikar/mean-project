import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./auth.model";
import { config } from "../../core/config/config";

export class AuthService {
    async register(email: string, password: string) {
        const existing = await User.findOne({ email });
        if (existing) throw new Error("User already exists");

        const hashed = await bcrypt.hash(password, 10);

        return User.create({ email, password: hashed });
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        return jwt.sign({ id: user._id }, config.jwtSecret);
    }
}