import { Request, Response } from "express";
export declare const createConsulta: (req: Request & {
    user?: {
        id: number;
    };
}, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConsultas: (req: Request & {
    user?: {
        id: number;
    };
}, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateConsulta: (req: Request & {
    user?: {
        id: number;
    };
}, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteConsulta: (req: Request & {
    user?: {
        id: number;
    };
}, res: Response) => Promise<Response<any, Record<string, any>>>;
