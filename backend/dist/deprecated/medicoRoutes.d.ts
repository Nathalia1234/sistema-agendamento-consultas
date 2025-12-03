declare const router: import("express-serve-static-core").Router;
export default router;
/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Endpoints para cadastro e gerenciamento de médicos
 */
/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cadastrar novo médico
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Dra. Fernanda Lima"
 *               especialidade:
 *                 type: string
 *                 example: "Cardiologia"
 *               telefone:
 *                 type: string
 *                 example: "(71) 98888-7777"
 *               email:
 *                 type: string
 *                 example: "fernanda.lima@example.com"
 *     responses:
 *       201:
 *         description: Médico cadastrado com sucesso
 */
/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Listar todos os médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos retornada com sucesso
 */
/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Buscar médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 */
/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualizar dados do médico
 *     tags: [Médicos]
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
 *                 example: "Dr. João Santos"
 *               especialidade:
 *                 type: string
 *                 example: "Ortopedia"
 *               telefone:
 *                 type: string
 *                 example: "(71) 97777-8888"
 *               email:
 *                 type: string
 *                 example: "joao.santos@example.com"
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 */
/**
 * /medicos/{id}:
 *   delete:
 *     summary: Excluir médico
 *     tags: [Médicos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico excluído com sucesso
 */
/**
 * @swagger
 * /medicos/{id}/agenda:
 *   get:
 *     summary: Visualizar agenda de atendimentos futuros do médico.
 *     description: "Retorna a lista de todas as consultas agendadas para o profissional, a partir da data/hora atual."
 *     tags:
 *       - Médicos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico logado.
 *     responses:
 *       '200':
 *         description: Lista de consultas futuras, incluindo dados do paciente (nome e telefone).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 5
 *                   data_consulta:
 *                     type: string
 *                     format: date-time
 *                     example: '2025-12-30T10:00:00Z'
 *                   descricao:
 *                     type: string
 *                     example: Consulta de acompanhamento.
 *                   nome_paciente:
 *                     type: string
 *                     example: Ana Lúcia
 *                   telefone_paciente:
 *                     type: string
 *                     example: '(71) 98765-4321'
 *       '400':
 *         description: ID do médico não fornecido ou inválido.
 *       '500':
 *         description: Erro interno do servidor.
 */
