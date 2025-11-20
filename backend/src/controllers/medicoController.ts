import { Request, Response } from "express";
import { pool } from "../database/connection.js";

export const listarMedicos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM medicos");
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarMedicoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM medicos WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Médico não encontrado" });
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const criarMedico = async (req: Request, res: Response) => {
  try {
    const { nome, especialidade, telefone, email } = req.body;
    const result = await pool.query(
      "INSERT INTO medicos (nome, especialidade, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, especialidade, telefone, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: "Erro ao cadastrar médico" });
  }
};

export const atualizarMedico = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, especialidade } = req.body;
  try {
    const result = await pool.query(
      "UPDATE medicos SET nome = $1, especialidade = $2 WHERE id = $3 RETURNING *",
      [nome, especialidade, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Médico não encontrado" });
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletarMedico = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM medicos WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Médico não encontrado" });
    res.json({ message: "Médico excluído com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
