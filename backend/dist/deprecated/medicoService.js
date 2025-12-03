"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoService = void 0;
const connection_js_1 = require("../database/connection.js");
// Serviço para gerenciar médicos
class MedicoService {
    // Listar todos os médicos
    async listar() {
        const result = await connection_js_1.pool.query("SELECT * FROM medicos");
        return result.rows;
    }
    // Buscar médico por ID
    async buscarPorId(id) {
        const result = await connection_js_1.pool.query("SELECT * FROM medicos WHERE id = $1", [id]);
        return result.rows[0];
    }
    // Criar novo médico
    async criar(nome, especialidade, telefone, email) {
        const result = await connection_js_1.pool.query("INSERT INTO medicos (nome, especialidade, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *", [nome, especialidade, telefone, email]);
        return result.rows[0];
    }
    // Atualizar informações do médico
    async atualizar(id, nome, especialidade) {
        const result = await connection_js_1.pool.query("UPDATE medicos SET nome = $1, especialidade = $2 WHERE id = $3 RETURNING *", [nome, especialidade, id]);
        return result.rows[0];
    }
    // Deletar médico
    async deletar(id) {
        const result = await connection_js_1.pool.query("DELETE FROM medicos WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}
exports.MedicoService = MedicoService;
//# sourceMappingURL=medicoService.js.map