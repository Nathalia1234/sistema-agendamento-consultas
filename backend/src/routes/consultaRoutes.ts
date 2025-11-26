import { Router } from "express";
import {
  createConsulta,
  getConsultas,
  getConsultaById,
  updateConsulta,
  deleteConsulta,
  cancelConsulta,
} from "../controllers/consultaController.js";

// Criação do roteador
const router = Router();

// Definição das rotas
// Rotas para CRUD de consultas


// Criar nova consulta
router.post("/", createConsulta);
// Listar todas as consultas
router.get("/", getConsultas);
// Buscar consulta por ID
router.get("/:id", getConsultaById);
// Atualizar consulta por ID
router.put("/:id", updateConsulta);
// Excluir consulta por ID
router.delete("/:id", deleteConsulta);
// Cancelar consulta por ID
router.put("/cancelar/:id", cancelConsulta);

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
 * /consultas/cancelar/{id}:
 * put:
 * summary: Cancelar uma consulta agendada
 * description: Atualiza o status da consulta para 'CANCELADA'. Requer autenticação JWT e verifica se o usuário autenticado é o paciente que agendou.
 * tags: [Consultas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * description: ID da consulta a ser cancelada
 * responses:
 * 200:
 * description: Consulta cancelada com sucesso. O horário foi liberado.
 * 401:
 * description: Não autorizado (Token inválido ou não fornecido)
 * 403:
 * description: Acesso negado. Você só pode cancelar suas próprias consultas.
 * 404:
 * description: Consulta não encontrada
 * 500:
 * description: Erro interno do servidor ao processar o cancelamento
 */

