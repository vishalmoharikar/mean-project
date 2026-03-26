import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

export const correlationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const correlationId = req.headers["x-correlation-id"] || uuidv4();

    req.headers["x-correlation-id"] = correlationId as string;

    (req as any).correlationId = correlationId;

    res.setHeader("x-correlation-id", correlationId as string);

    next();
};