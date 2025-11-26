import { Request, Response } from "express";
import { pool } from "../database/connection.js";
import { ConsultaService } from "../services/consultaService.js";

const consultaService = new ConsultaService();

// Criar nova consulta com validações e checagem de conflito
// Criar nova consulta com validações e checagem de conflito
export const createConsulta = async (req: Request, res: Response) => {
  try {
    const { paciente_id, medico_id, data_consulta, descricao } = req.body;

    // 1) Validação básica de campos obrigatórios
    if (!paciente_id || !medico_id || !data_consulta) {
      return res.status(400).json({
        error:
          "Os campos paciente_id, medico_id e data_consulta são obrigatórios.",
      });
    }

    // 2) Validar formato de data e se é futura
    const dataHora = new Date(data_consulta);
    if (Number.isNaN(dataHora.getTime())) {
      return res.status(400).json({
        error: "data_consulta inválida. Use um formato de data/hora válido.",
      });
    }

    const agora = new Date();
    if (dataHora < agora) {
      return res.status(400).json({
        error: "Não é permitido agendar consultas no passado.",
      });
    }

    // 3) Verificar se paciente existe
    const pacienteResult = await pool.query(
      "SELECT id FROM pacientes WHERE id = $1",
      [paciente_id]
    );
    if (pacienteResult.rowCount === 0) {
      return res.status(404).json({
        error: "Paciente não encontrado.",
      });
    }

    // 4) Verificar se médico existe
    const medicoResult = await pool.query(
      "SELECT id FROM medicos WHERE id = $1",
      [medico_id]
    );
    if (medicoResult.rowCount === 0) {
      return res.status(404).json({
        error: "Médico não encontrado.",
      });
    }

    // 5) Verificar se já existe consulta para o mesmo médico no mesmo horário
    const conflitoResult = await pool.query(
      "SELECT 1 FROM consultas WHERE medico_id = $1 AND data_consulta = $2",
      [medico_id, data_consulta]
    );

if ((conflitoResult?.rowCount ?? 0) > 0) {
  return res.status(409).json({
    error: "Já existe uma consulta agendada para este médico neste horário.",
  });
}


    // 6) Criar a consulta
    const result = await pool.query(
      "INSERT INTO consultas (paciente_id, medico_id, data_consulta, descricao) VALUES ($1, $2, $3, $4) RETURNING *",
      [paciente_id, medico_id, data_consulta, descricao]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Erro ao criar consulta:", error);
    return res.status(500).json({ error: "Erro interno ao criar consulta." });
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

export async function cancelConsulta(req: Request, res: Response) {
  const consultaId = parseInt(req.params.id, 10);

  try {
    // Chamada direta ao Service
    await consultaService.cancelConsulta(consultaId);

    return res.status(200).json({
      message: "✅ Consulta cancelada com sucesso. O horário foi liberado.",
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes("Consulta não encontrada")) {
            return res.status(404).json({ message: error.message });
        }
    console.error("Erro ao cancelar consulta:", error);
    return res.status(500).json({ message: "Erro interno ao processar o cancelamento." });
  }
}
