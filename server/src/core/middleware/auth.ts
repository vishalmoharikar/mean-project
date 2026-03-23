import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.sendStatus(401);

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;

        next();
    } catch {
        res.sendStatus(401);
    }
};