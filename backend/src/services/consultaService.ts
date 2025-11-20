import { pool } from "../database/connection.js";

export class ConsultaService {
  async criarConsulta(data: any) {
    const { paciente, medico, data_consulta, descricao } = data;
    const result = await pool.query(
      "INSERT INTO consultas (paciente, medico, data_consulta, descricao) VALUES ($1, $2, $3, $4) RETURNING *",
      [paciente, medico, data_consulta, descricao]
    );
    return result.rows[0];
  }

  async listarConsultas() {
    const result = await pool.query("SELECT * FROM consultas ORDER BY id ASC");
    return result.rows;
  }

  async buscarConsultaPorId(id: number) {
    const result = await pool.query("SELECT * FROM consultas WHERE id = $1", [id]);
    return result.rows[0];
  }

  async atualizarConsulta(id: number, data: any) {
    const { paciente, medico, data_consulta, descricao } = data;
    const result = await pool.query(
      "UPDATE consultas SET paciente=$1, medico=$2, data_consulta=$3, descricao=$4 WHERE id=$5 RETURNING *",
      [paciente, medico, data_consulta, descricao, id]
    );
    return result.rows[0];
  }

  async deletarConsulta(id: number) {
    await pool.query("DELETE FROM consultas WHERE id = $1", [id]);
  }
}
