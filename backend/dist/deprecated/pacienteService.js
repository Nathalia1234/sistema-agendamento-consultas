"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteService = void 0;
const connection_js_1 = require("../database/connection.js");
// Serviço para gerenciar pacientes
class PacienteService {
    // Listar todos os pacientes
    async listar() {
        const result = await connection_js_1.pool.query("SELECT * FROM pacientes");
        return result.rows;
    }
    // Buscar paciente por ID
    async buscarPorId(id) {
        const result = await connection_js_1.pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        return result.rows[0];
    }
    // Criar novo paciente
    async criar(nome, idade, telefone) {
        const result = await connection_js_1.pool.query("INSERT INTO pacientes (nome, idade, telefone) VALUES ($1, $2, $3) RETURNING *", [nome, idade, telefone]);
        return result.rows[0];
    }
    // Atualizar paciente existente
    async atualizar(id, nome, idade, telefone) {
        const result = await connection_js_1.pool.query("UPDATE pacientes SET nome = $1, idade = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, idade, telefone, id]);
        return result.rows[0];
    }
    // Deletar paciente
    async deletar(id) {
        const result = await connection_js_1.pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}
exports.PacienteService = PacienteService;
//# sourceMappingURL=pacienteService.js.map