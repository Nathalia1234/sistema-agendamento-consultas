import { pool } from "../database/connection.js";
export class PacienteService {
    async listar() {
        const result = await pool.query("SELECT * FROM pacientes");
        return result.rows;
    }
    async buscarPorId(id) {
        const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        return result.rows[0];
    }
    async criar(nome, idade, telefone) {
        const result = await pool.query("INSERT INTO pacientes (nome, idade, telefone) VALUES ($1, $2, $3) RETURNING *", [nome, idade, telefone]);
        return result.rows[0];
    }
    async atualizar(id, nome, idade, telefone) {
        const result = await pool.query("UPDATE pacientes SET nome = $1, idade = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, idade, telefone, id]);
        return result.rows[0];
    }
    async deletar(id) {
        const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}
//# sourceMappingURL=pacienteService.js.map