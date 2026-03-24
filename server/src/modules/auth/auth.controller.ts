import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await service.register(req.body.email, req.body.password);
        res.json(user);
    } catch (e: any) {
        next(e);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await service.login(req.body.email, req.body.password);
        res.json({ token });
    } catch (e: any) {
        next(e);
    }
};