"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgendaSemanal = exports.deletarPaciente = exports.atualizarPaciente = exports.buscarPacientePorId = exports.listarPacientes = exports.criarPaciente = void 0;
const connection_js_1 = require("../database/connection.js");
// Cadastrar paciente
const criarPaciente = async (req, res) => {
    try {
        const { nome, idade, telefone, email } = req.body;
        const result = await connection_js_1.pool.query(`INSERT INTO pacientes (nome, idade, telefone, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [nome, idade, telefone, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao cadastrar paciente" });
    }
};
exports.criarPaciente = criarPaciente;
// Listar todos os pacientes
const listarPacientes = async (req, res) => {
    try {
        const result = await connection_js_1.pool.query("SELECT * FROM pacientes");
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.listarPacientes = listarPacientes;
// Buscar paciente por ID
const buscarPacientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await connection_js_1.pool.query("SELECT * FROM pacientes WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Paciente não encontrado" });
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.buscarPacientePorId = buscarPacientePorId;
// Atualizar paciente
const atualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nome, idade, telefone } = req.body;
    try {
        const result = await connection_js_1.pool.query("UPDATE pacientes SET nome = $1, idade = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, idade, telefone, id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Paciente não encontrado" });
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.atualizarPaciente = atualizarPaciente;
// Excluir paciente
const deletarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await connection_js_1.pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Paciente não encontrado" });
        res.json({ message: "Paciente excluído com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deletarPaciente = deletarPaciente;
// Buscar disponibilidade para um período
const getAgendaSemanal = async (req, res) => {
    const { medicoId, dataInicio, dataFim } = req.query;
    if (!medicoId || !dataInicio || !dataFim) {
        return res
            .status(400)
            .json({ error: "Obrigatório fornecer medicoId, dataInicio e dataFim." });
    }
    try {
        const agendaCompleta = [];
        let diaAtual = new Date(dataInicio);
        const fimPeriodo = new Date(dataFim);
        // Define a regra de negócio codificada (09:00 às 17:00, 30 min)
        const HORARIO_INICIO_PADRAO = "09:00";
        const HORARIO_FIM_PADRAO = "17:00";
        const DURACAO_CONSULTA_MINUTOS = 30;
        // Loop principal: Percorre cada dia no intervalo
        while (diaAtual <= fimPeriodo) {
            const dataString = diaAtual.toISOString().substring(0, 10); // Ex: '2025-12-10'
            // A. Buscar Horários Ocupados (APENAS ESTA PARTE É EXECUTADA NO LOOP)
            const ocupadosResult = await connection_js_1.pool.query(`SELECT TO_CHAR(data_consulta, 'HH24:MI') AS hora_ocupada
                 FROM consultas
                 WHERE medico_id = $1 AND data_consulta::date = $2`, [medicoId, dataString]);
            const horariosOcupados = ocupadosResult.rows.map((row) => row.hora_ocupada);
            // B. Gerar Slots e Filtrar
            const horariosDisponiveis = [];
            let currentTime = new Date(`2000/01/01 ${HORARIO_INICIO_PADRAO}`);
            const endTime = new Date(`2000/01/01 ${HORARIO_FIM_PADRAO}`);
            while (currentTime < endTime) {
                const slot = currentTime.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
                if (!horariosOcupados.includes(slot)) {
                    horariosDisponiveis.push(slot);
                }
                currentTime.setMinutes(currentTime.getMinutes() + DURACAO_CONSULTA_MINUTOS);
            }
            // Adiciona o resultado do dia
            agendaCompleta.push({
                data: dataString,
                horarios: horariosDisponiveis,
                disponivel: horariosDisponiveis.length > 0,
            });
            // Avança para o próximo dia
            diaAtual.setDate(diaAtual.getDate() + 1);
        }
        res.status(200).json(agendaCompleta);
    }
    catch (error) {
        console.error("Erro ao buscar agenda semanal:", error);
        res.status(500).json({ error: "Erro interno ao buscar agenda." });
    }
};
exports.getAgendaSemanal = getAgendaSemanal;
//# sourceMappingURL=pacienteController.js.map