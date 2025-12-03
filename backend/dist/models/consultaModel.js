"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsulta = createConsulta;
exports.listarConsultasPorUsuario = listarConsultasPorUsuario;
const connection_js_1 = require("../database/connection.js");
async function createConsulta(pacienteId, medicoId, horario) {
    const query = `
    INSERT INTO consultas (paciente_id, medico_id, horario)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const result = await connection_js_1.pool.query(query, [pacienteId, medicoId, horario]);
    return result.rows[0];
}
async function listarConsultasPorUsuario(userId) {
    const result = await connection_js_1.pool.query("SELECT * FROM consultas WHERE paciente_id = $1", [userId]);
    return result.rows;
}
//# sourceMappingURL=consultaModel.js.map