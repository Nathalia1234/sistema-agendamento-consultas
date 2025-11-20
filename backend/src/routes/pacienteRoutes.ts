import { Router } from "express";

import {
  criarPaciente,
  listarPacientes,
  buscarPacientePorId,
  atualizarPaciente,
  deletarPaciente
} from "../controllers/pacienteController.js";

const router = Router();

router.post("/", criarPaciente);
router.get("/", listarPacientes);
router.get("/:id", buscarPacientePorId);
router.put("/:id", atualizarPaciente);
router.delete("/:id", deletarPaciente);

export default router;

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints para cadastro e gerenciamento de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cadastrar novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Carlos Silva"
 *               idade:
 *                 type: integer
 *                 example: 45
 *               telefone:
 *                 type: string
 *                 example: "(71) 97777-6666"
 *               email:
 *                 type: string
 *                 example: "carlos.silva@example.com"
 *     responses:
 *       201:
 *         description: Paciente cadastrado com sucesso
 */
/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Listar todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 */
/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Buscar paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 */
/**  
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualizar dados do paciente
 *     tags: [Pacientes]
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
 *               nome:
 *                 type: string
 *                 example: "Carlos Santos"
 *               idade:
 *                 type: integer
 *                 example: 46
 *               telefone:
 *                 type: string
 *                 example: "(71) 98888-9999"
 *               email:
 *                 type: string
 *                 example: "carlos.santos@example.com"
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 */
/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Excluir paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente excluído com sucesso
 */
