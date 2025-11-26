export declare class PacienteService {
    listar(): Promise<any[]>;
    buscarPorId(id: number): Promise<any>;
    criar(nome: string, idade: number, telefone: string): Promise<any>;
    atualizar(id: number, nome: string, idade: number, telefone: string): Promise<any>;
    deletar(id: number): Promise<any>;
}
