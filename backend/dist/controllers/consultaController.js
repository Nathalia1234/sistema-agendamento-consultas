"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConsulta = exports.updateConsulta = exports.getConsultas = exports.createConsulta = void 0;
const connection_js_1 = require("../database/connection.js");
// Criar uma nova consulta
const createConsulta = async (req, res) => {
    try {
        const { data_consulta, descricao } = req.body;
        const user_id = req.user?.id;
        if (!user_id || !data_consulta) {
            return res.status(400).json({
                error: "Os campos data_consulta e usuário são obrigatórios."
            });
        }
        const result = await connection_js_1.pool.query(`
      INSERT INTO consultas (data_consulta, descricao, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [data_consulta, descricao, user_id]);
        return res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Erro ao criar consulta:", error);
        return res.status(500).json({ error: "Erro ao criar consulta" });
    }
};
exports.createConsulta = createConsulta;
// Listar todas as consultas do usuário autenticado
const getConsultas = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const result = await connection_js_1.pool.query(`SELECT * FROM consultas WHERE user_id = $1 ORDER BY data_consulta ASC`, [user_id]);
        return res.json(result.rows);
    }
    catch (error) {
        console.error("Erro ao listar consultas:", error);
        return res.status(500).json({ error: "Erro ao buscar consultas" });
    }
};
exports.getConsultas = getConsultas;
// Atualizar uma consulta existente
const updateConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const { data_consulta, descricao } = req.body;
        const user_id = req.user?.id;
        // verifica se a consulta pertence ao usuário
        const consulta = await connection_js_1.pool.query(`SELECT * FROM consultas WHERE id = $1 AND user_id = $2`, [id, user_id]);
        if (consulta.rowCount === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        const result = await connection_js_1.pool.query(`
      UPDATE consultas
      SET data_consulta = $1, descricao = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *
      `, [data_consulta, descricao, id, user_id]);
        return res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Erro ao atualizar consulta:", error);
        return res.status(500).json({ error: "Erro ao atualizar consulta" });
    }
};
exports.updateConsulta = updateConsulta;
// Excluir uma consulta existente
const deleteConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user?.id;
        const consulta = await connection_js_1.pool.query(`SELECT * FROM consultas WHERE id = $1 AND user_id = $2`, [id, user_id]);
        if (consulta.rowCount === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        await connection_js_1.pool.query(`
      DELETE FROM consultas
      WHERE id = $1 AND user_id = $2
      `, [id, user_id]);
        return res.json({ message: "Consulta excluída com sucesso" });
    }
    catch (error) {
        console.error("Erro ao excluir consulta:", error);
        return res.status(500).json({ error: "Erro ao excluir consulta" });
    }
};
exports.deleteConsulta = deleteConsulta;
//# sourceMappingURL=consultaController.js.map