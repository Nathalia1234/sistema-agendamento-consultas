"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelConsulta = exports.deleteConsulta = exports.updateConsulta = exports.getConsultaById = exports.getConsultas = exports.createConsulta = void 0;
const connection_js_1 = require("../database/connection.js");
const consultaService_js_1 = require("../services/consultaService.js");
const consultaService = new consultaService_js_1.ConsultaService();
// ------------------------------------------------------------
// Criar nova consulta
// ------------------------------------------------------------
const createConsulta = async (req, res) => {
    try {
        const { paciente_id, medico_id, data_consulta, descricao } = req.body;
        if (!paciente_id || !medico_id || !data_consulta) {
            return res.status(400).json({
                error: "Os campos paciente_id, medico_id e data_consulta são obrigatórios.",
            });
        }
        const dataHora = new Date(data_consulta);
        if (Number.isNaN(dataHora.getTime())) {
            return res.status(400).json({
                error: "data_consulta inválida. Envie um formato de data/hora válido.",
            });
        }
        if (dataHora < new Date()) {
            return res.status(400).json({
                error: "Não é permitido agendar consultas no passado.",
            });
        }
        // Verificar se paciente existe
        const paciente = await connection_js_1.pool.query("SELECT id FROM pacientes WHERE id = $1", [paciente_id]);
        if (paciente.rowCount === 0) {
            return res.status(404).json({ error: "Paciente não encontrado." });
        }
        // Verificar se médico existe
        const medico = await connection_js_1.pool.query("SELECT id FROM medicos WHERE id = $1", [medico_id]);
        if (medico.rowCount === 0) {
            return res.status(404).json({ error: "Médico não encontrado." });
        }
        // Checar conflito de agenda
        const conflito = await connection_js_1.pool.query("SELECT 1 FROM consultas WHERE medico_id = $1 AND data_consulta = $2", [medico_id, data_consulta]);
        if (conflito.rowCount && conflito.rowCount > 0) {
            return res.status(409).json({
                error: "Já existe uma consulta para este médico neste horário.",
            });
        }
        // Criar consulta
        const result = await connection_js_1.pool.query(`INSERT INTO consultas (paciente_id, medico_id, data_consulta, descricao)
       VALUES ($1, $2, $3, $4) RETURNING *`, [paciente_id, medico_id, data_consulta, descricao]);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error("Erro ao criar consulta:", error);
        return res.status(500).json({ error: "Erro interno ao criar consulta." });
    }
};
exports.createConsulta = createConsulta;
// ------------------------------------------------------------
// Listar todas as consultas
// ------------------------------------------------------------
const getConsultas = async (req, res) => {
    try {
        const result = await connection_js_1.pool.query("SELECT * FROM consultas ORDER BY data_consulta ASC");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getConsultas = getConsultas;
// ------------------------------------------------------------
// Buscar consulta por ID
// ------------------------------------------------------------
const getConsultaById = async (req, res) => {
    try {
        const result = await connection_js_1.pool.query("SELECT * FROM consultas WHERE id = $1", [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getConsultaById = getConsultaById;
// ------------------------------------------------------------
// Atualizar consulta
// ------------------------------------------------------------
const updateConsulta = async (req, res) => {
    try {
        const { descricao, data_consulta } = req.body;
        const result = await connection_js_1.pool.query(`UPDATE consultas 
       SET descricao = $1, data_consulta = $2 
       WHERE id = $3 RETURNING *`, [descricao, data_consulta, req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        return res.status(200).json({
            message: "Consulta atualizada com sucesso!",
            consulta: result.rows[0]
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateConsulta = updateConsulta;
// ------------------------------------------------------------
// Deletar consulta
// ------------------------------------------------------------
const deleteConsulta = async (req, res) => {
    try {
        const result = await connection_js_1.pool.query("DELETE FROM consultas WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Consulta não encontrada!" });
        }
        res.json({ message: "Consulta excluída com sucesso!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteConsulta = deleteConsulta;
// ------------------------------------------------------------
// Cancelar consulta (via Service)
// ------------------------------------------------------------
const cancelConsulta = async (req, res) => {
    try {
        await consultaService.cancelConsulta(parseInt(req.params.id, 10));
        return res.status(200).json({
            message: "Consulta cancelada com sucesso!",
        });
    }
    catch (error) {
        if (error.message.includes("Consulta não encontrada!")) {
            return res.status(404).json({ error: error.message });
        }
        console.error("Erro ao cancelar consulta:", error);
        return res.status(500).json({
            error: "Erro interno ao processar cancelamento!",
        });
    }
};
exports.cancelConsulta = cancelConsulta;
//# sourceMappingURL=consultaController.js.map