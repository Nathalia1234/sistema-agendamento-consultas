import { Request, Response } from "express";
export declare const criarPaciente: (req: Request, res: Response) => Promise<void>;
export declare const listarPacientes: (req: Request, res: Response) => Promise<void>;
export declare const buscarPacientePorId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const atualizarPaciente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletarPaciente: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAgendaSemanal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
