import express from "express";

import {
  createConsulta,
  getConsultas,
  getConsultaById,
  updateConsulta,
  deleteConsulta,
  cancelConsulta,
} from "../controllers/consultaController.js";

// Cria o roteador
const router = express.Router();

// Cancelar consulta – importante vir ANTES de "/:id"
router.delete("/cancel/:id", cancelConsulta);

// Criar nova consulta
router.post("/", createConsulta);

// Listar todas as consultas
router.get("/", getConsultas);

// Buscar consulta por ID
router.get("/:id", getConsultaById);

// Atualizar consulta
router.put("/:id", updateConsulta);

// Deletar consulta
router.delete("/:id", deleteConsulta);

// Exportar o roteador
export default router;

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Endpoints para gerenciar consultas médicas
 */

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Criar uma nova consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paciente_id:
 *                 type: integer
 *                 example: 1
 *               medico_id:
 *                 type: integer
 *                 example: 1
 *               data_consulta:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-25T14:00:00"
 *               descricao:
 *                 type: string
 *                 example: "Consulta de rotina"
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Erro ao criar consulta
 */


/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Listar todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas retornada com sucesso
 */

/**
 * @swagger
* /consultas/{id}:
 *   get:
 *     summary: Buscar consulta por ID
 *     tags: [Consultas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       404:
 *         description: Consulta não encontrada
 */

/**
 * @swagger
* /consultas/{id}:
 *   put:
 *     summary: Atualizar dados de uma consulta
 *     tags: [Consultas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_consulta:
 *                 type: string
 *                 example: "2025-12-01T09:00:00"
 *               descricao:
 *                 type: string
 *                 example: "Revisão médica"
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       404:
 *         description: Consulta não encontrada
 */

/**
 * @swagger
 * /consultas/{id}:
 *   delete:
 *     summary: Excluir consulta por ID
 *     tags: [Consultas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta excluída com sucesso
 *       404:
 *         description: Consulta não encontrada
 */

/**
 * @swagger
 * /consultas/cancel/{id}:
 *   put:
 *     summary: Cancelar uma consulta agendada
 *     description: Atualiza o status da consulta para 'CANCELADA'. Requer token JWT.
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta a ser cancelada
 *     responses:
 *       200:
 *         description: Consulta cancelada com sucesso. O horário foi liberado.
 *       401:
 *         description: Não autorizado — token inválido ou ausente.
 *       403:
 *         description: Acesso negado — o usuário só pode cancelar suas próprias consultas.
 *       404:
 *         description: Consulta não encontrada.
 *       500:
 *         description: Erro interno no servidor.
 */


