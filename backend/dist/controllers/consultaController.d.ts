import { Request, Response } from "express";
export declare const createConsulta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConsultas: (req: Request, res: Response) => Promise<void>;
export declare const getConsultaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateConsulta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteConsulta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const cancelConsulta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
