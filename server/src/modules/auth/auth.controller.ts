import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const user = await service.register(req.body.email, req.body.password);
        res.json(user);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await service.login(req.body.email, req.body.password);
        res.json({ token });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};