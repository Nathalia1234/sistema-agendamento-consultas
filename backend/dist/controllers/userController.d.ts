import { Request, Response } from "express";
export declare function registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getUserProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
