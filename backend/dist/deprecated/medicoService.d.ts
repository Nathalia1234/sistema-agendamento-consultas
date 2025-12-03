export declare class MedicoService {
    listar(): Promise<any[]>;
    buscarPorId(id: number): Promise<any>;
    criar(nome: string, especialidade: string, telefone: string, email: string): Promise<any>;
    atualizar(id: number, nome: string, especialidade: string): Promise<any>;
    deletar(id: number): Promise<any>;
}
