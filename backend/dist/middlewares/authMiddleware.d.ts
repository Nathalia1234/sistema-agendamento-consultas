import { Request, Response, NextFunction } from "express";
export default function authMiddleware(req: Request & {
    user?: {
        id: number;
    };
}, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
