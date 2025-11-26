import { Request, Response } from "express";
import { pool } from "../database/connection.js";

// Cadastrar paciente
export const criarPaciente = async (req: Request, res: Response) => {
  try {
    const { nome, idade, telefone, email } = req.body;
    const result = await pool.query(
      `INSERT INTO pacientes (nome, idade, telefone, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, idade, telefone, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar paciente" });
  }
};

// Listar todos os pacientes
export const listarPacientes = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM pacientes");
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar paciente por ID
export const buscarPacientePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar paciente
export const atualizarPaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, idade, telefone } = req.body;
  try {
    const result = await pool.query(
      "UPDATE pacientes SET nome = $1, idade = $2, telefone = $3 WHERE id = $4 RETURNING *",
      [nome, idade, telefone, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir paciente
export const deletarPaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM pacientes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Paciente não encontrado" });
    res.json({ message: "Paciente excluído com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// NOVO: Buscar disponibilidade para um período
export const getAgendaSemanal = async (req: Request, res: Response) => {
  const { medicoId, dataInicio, dataFim } = req.query;

  if (!medicoId || !dataInicio || !dataFim) {
    return res
      .status(400)
      .json({ error: "Obrigatório fornecer medicoId, dataInicio e dataFim." });
  }

  try {
    const agendaCompleta = [];
    let diaAtual = new Date(dataInicio as string);
    const fimPeriodo = new Date(dataFim as string);

    // Define a regra de negócio codificada (09:00 às 17:00, 30 min)
    const HORARIO_INICIO_PADRAO = "09:00";
    const HORARIO_FIM_PADRAO = "17:00";
    const DURACAO_CONSULTA_MINUTOS = 30;

    // Loop principal: Percorre cada dia no intervalo
    while (diaAtual <= fimPeriodo) {
      const dataString = diaAtual.toISOString().substring(0, 10); // Ex: '2025-12-10'

      // A. Buscar Horários Ocupados (APENAS ESTA PARTE É EXECUTADA NO LOOP)
      const ocupadosResult = await pool.query(
        `SELECT TO_CHAR(data_consulta, 'HH24:MI') AS hora_ocupada
                 FROM consultas
                 WHERE medico_id = $1 AND data_consulta::date = $2`,
        [medicoId, dataString]
      );
      const horariosOcupados = ocupadosResult.rows.map(
        (row) => row.hora_ocupada
      );

      // B. Gerar Slots e Filtrar
      const horariosDisponiveis: string[] = [];
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
        currentTime.setMinutes(
          currentTime.getMinutes() + DURACAO_CONSULTA_MINUTOS
        );
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
  } catch (error: any) {
    console.error("Erro ao buscar agenda semanal:", error);
    res.status(500).json({ error: "Erro interno ao buscar agenda." });
  }
};
