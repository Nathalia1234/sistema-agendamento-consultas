import { Request, Response } from "express";
import { pool } from "../database/connection.js";

// Criar uma nova consulta
export const createConsulta = async (
  req: Request & { user?: { id: number } },
  res: Response
) => {
  try {
    const { data_consulta, descricao } = req.body;
    const user_id = req.user?.id;

    if (!user_id || !data_consulta) {
      return res.status(400).json({
        error: "Os campos data_consulta e usuário são obrigatórios."
      });
    }

    const result = await pool.query(
      `
      INSERT INTO consultas (data_consulta, descricao, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [data_consulta, descricao, user_id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    return res.status(500).json({ error: "Erro ao criar consulta" });
  }
};

// Listar todas as consultas do usuário autenticado
export const getConsultas = async (
  req: Request & { user?: { id: number } },
  res: Response
) => {
  try {
    const user_id = req.user?.id;

    const result = await pool.query(
      `SELECT * FROM consultas WHERE user_id = $1 ORDER BY data_consulta ASC`,
      [user_id]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
    return res.status(500).json({ error: "Erro ao buscar consultas" });
  }
};

// Atualizar uma consulta existente
export const updateConsulta = async (
  req: Request & { user?: { id: number } },
  res: Response
) => {
  try {
    const { id } = req.params;
    const { data_consulta, descricao } = req.body;
    const user_id = req.user?.id;

    // verifica se a consulta pertence ao usuário
    const consulta = await pool.query(
      `SELECT * FROM consultas WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );

    if (consulta.rowCount === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    const result = await pool.query(
      `
      UPDATE consultas
      SET data_consulta = $1, descricao = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *
      `,
      [data_consulta, descricao, id, user_id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar consulta:", error);
    return res.status(500).json({ error: "Erro ao atualizar consulta" });
  }
};

// Excluir uma consulta existente
export const deleteConsulta = async (
  req: Request & { user?: { id: number } },
  res: Response
) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    const consulta = await pool.query(
      `SELECT * FROM consultas WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );

    if (consulta.rowCount === 0) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    await pool.query(
      `
      DELETE FROM consultas
      WHERE id = $1 AND user_id = $2
      `,
      [id, user_id]
    );

    return res.json({ message: "Consulta excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir consulta:", error);
    return res.status(500).json({ error: "Erro ao excluir consulta" });
  }
};
