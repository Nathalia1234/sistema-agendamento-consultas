"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteController_js_1 = require("./pacienteController.js");
// Definição das rotas para pacientes
const router = (0, express_1.Router)();
// Rotas CRUD para Pacientes
// Cadastrar novo paciente
router.post("/", pacienteController_js_1.criarPaciente);
// Listar todos os pacientes
router.get("/", pacienteController_js_1.listarPacientes);
// Buscar paciente por ID
router.get("/:id", pacienteController_js_1.buscarPacientePorId);
// Atualizar paciente por ID
router.put("/:id", pacienteController_js_1.atualizarPaciente);
// Deletar paciente por ID
router.delete("/:id", pacienteController_js_1.deletarPaciente);
// Obter agenda semanal de disponibilidade
router.get("/disponibilidade", pacienteController_js_1.getAgendaSemanal);
// Exporta o roteador de pacientes
exports.default = router;
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
/**
 * @swagger
 *   /pacientes/disponibilidade:
 *     get:
 *       summary: Busca a agenda de horários disponíveis para agendamento.
 *       description: "Retorna os horários livres de um médico em um intervalo, usando uma regra de negócio codificada (Ex: 09:00 - 17:00)."
 *       tags:
 *         - Pacientes
 *       parameters:
 *         - name: medicoId
 *           in: query
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do médico para checar a agenda.
 *         - name: dataInicio
 *           in: query
 *           required: true
 *           schema:
 *             type: string
 *             format: date
 *             example: '2025-12-10'
 *           description: Data de início do período (YYYY-MM-DD).
 *         - name: dataFim
 *           in: query
 *           required: true
 *           schema:
 *             type: string
 *             format: date
 *             example: '2025-12-17'
 *           description: Data de fim do período (YYYY-MM-DD).
 *       responses:
 *         '200':
 *           description: Agenda detalhada com horários disponíveis por dia.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: string
 *                       format: date
 *                       example: '2025-12-10'
 *                     horarios:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: '10:00'
 *                     disponivel:
 *                       type: boolean
 *                       example: true
 *         '400':
 *           description: Parâmetros faltando ou inválidos.
 */
//# sourceMappingURL=pacienteRoutes.js.map