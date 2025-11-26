import { pool } from "../database/connection.js";

// Serviço para gerenciar médicos
export class MedicoService {
  // Listar todos os médicos
  async listar() {
    const result = await pool.query("SELECT * FROM medicos");
    return result.rows;
  }

  // Buscar médico por ID
  async buscarPorId(id: number) {
    const result = await pool.query("SELECT * FROM medicos WHERE id = $1", [id]);
    return result.rows[0];
  }

  // Criar novo médico
  async criar(nome: string, especialidade: string, telefone: string, email: string) {
    const result = await pool.query(
    "INSERT INTO medicos (nome, especialidade, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *",
    [nome, especialidade, telefone, email]
  );
  return result.rows[0];
}

  // Atualizar informações do médico
  async atualizar(id: number, nome: string, especialidade: string) {
    const result = await pool.query(
      "UPDATE medicos SET nome = $1, especialidade = $2 WHERE id = $3 RETURNING *",
      [nome, especialidade, id]
    );
    return result.rows[0];
  }

  // Deletar médico
  async deletar(id: number) {
    const result = await pool.query("DELETE FROM medicos WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  }
}
