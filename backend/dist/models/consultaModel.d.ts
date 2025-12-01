export interface Consulta {
    id?: number;
    paciente_id: number;
    medico_id: number;
    data_consulta: string;
    descricao?: string;
}
