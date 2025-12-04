import { Request, Response } from "express";
import { pool } from "../database/connection.js";
import { ConsultaService } from "../services/consultaService.js";

const consultaService = new ConsultaService();

export const createConsulta = async (req: Request, res: Response) => {
  try {
    const { data_consulta, descricao } = req.body;

    const user_id = req.user?.id; // vem do token

    if (!user_id || !data_consulta) {
      return res.status(400).json({ error: "Campos obrigatórios não enviados" });
    }

    const result = await pool.query(
      `INSERT INTO consultas (user_id, data_consulta, descricao)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, data_consulta, descricao]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getConsultas = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    const result = await pool.query(
      `SELECT * FROM consultas WHERE user_id = $1 ORDER BY data_consulta ASC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateConsulta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data_consulta, descricao } = req.body;

    const result = await pool.query(
      `UPDATE consultas
       SET data_consulta = $1, descricao = $2
       WHERE id = $3
       RETURNING *`,
      [data_consulta, descricao, id]
    );

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteConsulta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM consultas WHERE id = $1`, [id]);

    res.json({ message: "Consulta removida com sucesso." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
