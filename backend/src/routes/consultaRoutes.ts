import { Router } from "express";
import {
  createConsulta,
  getConsultas,
  getConsultaById,
  updateConsulta,
  deleteConsulta,
} from "../controllers/consultaController.js";

const router = Router();

router.post("/", createConsulta);
router.get("/", getConsultas);
router.get("/:id", getConsultaById);
router.put("/:id", updateConsulta);
router.delete("/:id", deleteConsulta);

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

