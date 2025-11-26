import { pool } from "../database/connection.js";
export class MedicoService {
    async listar() {
        const result = await pool.query("SELECT * FROM medicos");
        return result.rows;
    }
    async buscarPorId(id) {
        const result = await pool.query("SELECT * FROM medicos WHERE id = $1", [id]);
        return result.rows[0];
    }
    async criar(nome, especialidade, telefone, email) {
        const result = await pool.query("INSERT INTO medicos (nome, especialidade, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *", [nome, especialidade, telefone, email]);
        return result.rows[0];
    }
    async atualizar(id, nome, especialidade) {
        const result = await pool.query("UPDATE medicos SET nome = $1, especialidade = $2 WHERE id = $3 RETURNING *", [nome, especialidade, id]);
        return result.rows[0];
    }
    async deletar(id) {
        const result = await pool.query("DELETE FROM medicos WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}
//# sourceMappingURL=medicoService.js.map