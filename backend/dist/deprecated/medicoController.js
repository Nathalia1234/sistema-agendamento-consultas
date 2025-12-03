"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgendaMedico = exports.deletarMedico = exports.atualizarMedico = exports.criarMedico = exports.buscarMedicoPorId = exports.listarMedicos = void 0;
const connection_js_1 = require("../database/connection.js");
// Controladores para gerenciar médicos
// Inclui listagem, busca por ID, criação, atualização, exclusão e obtenção da agenda
// de consultas futuras do médico.
// Listar todos os médicos
const listarMedicos = async (req, res) => {
    try {
        const result = await connection_js_1.pool.query("SELECT * FROM medicos");
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.listarMedicos = listarMedicos;
// Buscar médico por ID
const buscarMedicoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await connection_js_1.pool.query("SELECT * FROM medicos WHERE id = $1", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Médico não encontrado" });
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.buscarMedicoPorId = buscarMedicoPorId;
// Criar novo médico
const criarMedico = async (req, res) => {
    try {
        const { nome, especialidade, telefone, email } = req.body;
        const result = await connection_js_1.pool.query("INSERT INTO medicos (nome, especialidade, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *", [nome, especialidade, telefone, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(400).json({ error: "Erro ao cadastrar médico" });
    }
};
exports.criarMedico = criarMedico;
// Atualizar médico existente
const atualizarMedico = async (req, res) => {
    const { id } = req.params;
    const { nome, especialidade } = req.body;
    try {
        const result = await connection_js_1.pool.query("UPDATE medicos SET nome = $1, especialidade = $2 WHERE id = $3 RETURNING *", [nome, especialidade, id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Médico não encontrado" });
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.atualizarMedico = atualizarMedico;
// Excluir médico
const deletarMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await connection_js_1.pool.query("DELETE FROM medicos WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Médico não encontrado" });
        res.json({ message: "Médico excluído com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deletarMedico = deletarMedico;
// Obter agenda de consultas futuras do médico
const getAgendaMedico = async (req, res) => {
    // É recomendado usar o ID do médico do token de autenticação (JWT)
    // Mas, para fins de teste, vamos pegá-lo do parâmetro de rota.
    const { id } = req.params; // Assume que o ID do médico virá na rota (ex: /medicos/2/agenda)
    if (!id) {
        return res.status(400).json({ error: "ID do médico é obrigatório." });
    }
    try {
        const query = `
            SELECT 
                c.id, 
                c.data_consulta, 
                c.descricao, 
                p.nome AS nome_paciente, 
                p.telefone AS telefone_paciente
            FROM 
                consultas c
            JOIN 
                pacientes p ON c.paciente_id = p.id
            WHERE 
                c.medico_id = $1 
                AND c.data_consulta >= NOW() -- Filtra apenas datas futuras
            ORDER BY 
                c.data_consulta ASC; -- Ordena do mais próximo para o mais distante
        `;
        const result = await connection_js_1.pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(200).json({
                message: "Nenhum atendimento futuro encontrado para este profissional.",
                agenda: []
            });
        }
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Erro ao buscar agenda do médico:", error);
        res.status(500).json({ error: "Erro interno ao buscar a agenda." });
    }
};
exports.getAgendaMedico = getAgendaMedico;
//# sourceMappingURL=medicoController.js.map