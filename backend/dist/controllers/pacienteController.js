import { pool } from "../database/connection.js";
// Cadastrar paciente
export const criarPaciente = async (req, res) => {
    try {
        const { nome, idade, telefone, email } = req.body;
        const result = await pool.query(`INSERT INTO pacientes (nome, idade, telefone, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [nome, idade, telefone, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao cadastrar paciente" });
    }
};
// Listar todos os pacientes
export const listarPacientes = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM pacientes");
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Buscar paciente por ID
export const buscarPacientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Paciente não encontrado" });
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Atualizar paciente
export const atualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nome, idade, telefone } = req.body;
    try {
        const result = await pool.query("UPDATE pacientes SET nome = $1, idade = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, idade, telefone, id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Paciente não encontrado" });
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Excluir paciente
export const deletarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Paciente não encontrado" });
        res.json({ message: "Paciente excluído com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=pacienteController.js.map