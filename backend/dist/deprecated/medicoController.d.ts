import { Request, Response } from "express";
export declare const listarMedicos: (req: Request, res: Response) => Promise<void>;
export declare const buscarMedicoPorId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const criarMedico: (req: Request, res: Response) => Promise<void>;
export declare const atualizarMedico: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletarMedico: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAgendaMedico: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
