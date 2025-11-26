export declare class ConsultaService {
    criarConsulta(data: any): Promise<any>;
    listarConsultas(): Promise<any[]>;
    buscarConsultaPorId(id: number): Promise<any>;
    atualizarConsulta(id: number, data: any): Promise<any>;
    deletarConsulta(id: number): Promise<void>;
}
