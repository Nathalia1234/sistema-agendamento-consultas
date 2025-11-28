import { Request, Response } from "express";
import { pool } from "../database/connection.js";
import { ConsultaService } from "../services/consultaService.js";

const consultaService = new ConsultaService();

// ------------------------------------------------------------
// Criar nova consulta
// ------------------------------------------------------------
export const createConsulta = async (req: Request, res: Response) => {
  try {
    const { paciente_id, medico_id, data_consulta, descricao } = req.body;

    if (!paciente_id || !medico_id || !data_consulta) {
      return res.status(400).json({
        error:
          "Os campos paciente_id, medico_id e data_consulta são obrigatórios.",
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
    const paciente = await pool.query(
      "SELECT id FROM pacientes WHERE id = $1",
      [paciente_id]
    );

    if (paciente.rowCount === 0) {
      return res.status(404).json({ error: "Paciente não encontrado." });
    }

    // Verificar se médico existe
    const medico = await pool.query(
      "SELECT id FROM medicos WHERE id = $1",
      [medico_id]
    );

    if (medico.rowCount === 0) {
      return res.status(404).json({ error: "Médico não encontrado." });
    }

    // Checar conflito de agenda
    const conflito = await pool.query(
      "SELECT 1 FROM consultas WHERE medico_id = $1 AND data_consulta = $2",
      [medico_id, data_consulta]
    );

    if (conflito.rowCount && conflito.rowCount > 0) {
      return res.status(409).json({
        error: "Já existe uma consulta para este médico neste horário.",
      });
    }

    // Criar consulta
    const result = await pool.query(
      `INSERT INTO consultas (paciente_id, medico_id, data_consulta, descricao)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [paciente_id, medico_id, data_consulta, descricao]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Erro ao criar consulta:", error);
    return res.status(500).json({ error: "Erro interno ao criar consulta." });
  }
};

// ------------------------------------------------------------
// Listar todas as consultas
// ------------------------------------------------------------
export const getConsultas = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM consultas ORDER BY data_consulta ASC"
    );
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------------------------------------
// Buscar consulta por ID
// ------------------------------------------------------------
export const getConsultaById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM consultas WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------------------------------------
// Atualizar consulta
// ------------------------------------------------------------
export const updateConsulta = async (req: Request, res: Response) => {
  try {
    const { descricao, data_consulta } = req.body;

    const result = await pool.query(
      `UPDATE consultas 
       SET descricao = $1, data_consulta = $2 
       WHERE id = $3 RETURNING *`,
      [descricao, data_consulta, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ------------------------------------------------------------
// Deletar consulta
// ------------------------------------------------------------
export const deleteConsulta = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "DELETE FROM consultas WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    res.json({ message: "Consulta excluída com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------------------------------------
// Cancelar consulta (via Service)
// ------------------------------------------------------------
export const cancelConsulta = async (req: Request, res: Response) => {
  try {
    await consultaService.cancelConsulta(parseInt(req.params.id, 10));

    return res.status(200).json({
      message: "Consulta cancelada com sucesso.",
    });
  } catch (error: any) {
    if (error.message.includes("Consulta não encontrada")) {
      return res.status(404).json({ error: error.message });
    }

    console.error("Erro ao cancelar consulta:", error);
    return res.status(500).json({
      error: "Erro interno ao processar cancelamento",
    });
  }
};
