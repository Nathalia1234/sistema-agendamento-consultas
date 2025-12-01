import { pool } from "../database/connection.js";
export async function createConsulta(pacienteId, medicoId, horario) {
    const query = `
    INSERT INTO consultas (paciente_id, medico_id, horario)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const result = await pool.query(query, [pacienteId, medicoId, horario]);
    return result.rows[0];
}
export async function listarConsultasPorUsuario(userId) {
    const result = await pool.query("SELECT * FROM consultas WHERE paciente_id = $1", [userId]);
    return result.rows;
}
//# sourceMappingURL=consultaModel.js.map