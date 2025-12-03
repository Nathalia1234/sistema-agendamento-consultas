"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaService = void 0;
const connection_js_1 = require("../database/connection.js");
// Serviço para gerenciar consultas médicas
class ConsultaService {
    // Cria uma nova consulta
    async criarConsulta(data) {
        const { paciente, medico, data_consulta, descricao } = data;
        const result = await connection_js_1.pool.query("INSERT INTO consultas (paciente, medico, data_consulta, descricao) VALUES ($1, $2, $3, $4) RETURNING *", [paciente, medico, data_consulta, descricao]);
        return result.rows[0];
    }
    // Lista todas as consultas
    async listarConsultas() {
        const result = await connection_js_1.pool.query("SELECT * FROM consultas ORDER BY id ASC");
        return result.rows;
    }
    // Busca uma consulta por ID
    async buscarConsultaPorId(id) {
        const result = await connection_js_1.pool.query("SELECT * FROM consultas WHERE id = $1", [id]);
        return result.rows[0];
    }
    // Atualiza uma consulta existente
    async atualizarConsulta(id, data) {
        const { paciente, medico, data_consulta, descricao } = data;
        const result = await connection_js_1.pool.query("UPDATE consultas SET paciente=$1, medico=$2, data_consulta=$3, descricao=$4 WHERE id=$5 RETURNING *", [paciente, medico, data_consulta, descricao, id]);
        return result.rows[0];
    }
    // Deleta uma consulta
    async deletarConsulta(id) {
        await connection_js_1.pool.query("DELETE FROM consultas WHERE id = $1", [id]);
    }
    // Cancela uma consulta
    async cancelConsulta(consultaId) {
        // Verifica se a consulta existe
        const consultaExistente = await connection_js_1.pool.query("SELECT id FROM consultas WHERE id = $1", [consultaId]);
        if (consultaExistente.rowCount === 0) {
            throw new Error("Consulta não encontrada");
        }
        // Cancela a consulta
        await connection_js_1.pool.query("DELETE FROM consultas WHERE id = $1", [consultaId]);
        return { message: "Consulta cancelada com sucesso" };
    }
}
exports.ConsultaService = ConsultaService;
//# sourceMappingURL=consultaService.js.map