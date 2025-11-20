import { Request, Response } from "express";
import { pool } from "../database/connection.js";

// Criar nova consulta
export const createConsulta = async (req: Request, res: Response) => {
  try {
    const { paciente_id, medico_id, data_consulta, descricao } = req.body;

    const result = await pool.query(
      "INSERT INTO consultas (paciente_id, medico_id, data_consulta, descricao) VALUES ($1, $2, $3, $4) RETURNING *",
      [paciente_id, medico_id, data_consulta, descricao]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as consultas
export const getConsultas = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM consultas ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar consulta por ID
export const getConsultaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM consultas WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar consulta
export const updateConsulta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descricao, data_consulta } = req.body;

    const result = await pool.query(
      "UPDATE consultas SET descricao = $1, data_consulta = $2 WHERE id = $3 RETURNING *",
      [descricao, data_consulta, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar consulta
export const deleteConsulta = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM consultas WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    res.json({ message: "Consulta excluída com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

