import { pool } from "../database/connection.js";

// Serviço para gerenciar pacientes
export class PacienteService {
  // Listar todos os pacientes
  async listar() {
    const result = await pool.query("SELECT * FROM pacientes");
    return result.rows;
  }

  // Buscar paciente por ID
  async buscarPorId(id: number) {
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
    return result.rows[0];
  }

   // Criar novo paciente
  async criar(nome: string, idade: number, telefone: string) {
    const result = await pool.query(
      "INSERT INTO pacientes (nome, idade, telefone) VALUES ($1, $2, $3) RETURNING *",
      [nome, idade, telefone]
    );
    return result.rows[0];
  }

  // Atualizar paciente existente
  async atualizar(id: number, nome: string, idade: number, telefone: string) {
    const result = await pool.query(
      "UPDATE pacientes SET nome = $1, idade = $2, telefone = $3 WHERE id = $4 RETURNING *",
      [nome, idade, telefone, id]
    );
    return result.rows[0];
  }

  // Deletar paciente
  async deletar(id: number) {
    const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  }
}
