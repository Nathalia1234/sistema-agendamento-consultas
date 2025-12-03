"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../controllers/userController.js");
// Cria uma nova instância do roteador
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para login e registro de usuários
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Usuário Teste"
 *               email:
 *                 type: string
 *                 example: "teste@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro ao registrar usuário
 */
/**
 * Rota: POST /auth/register
 * Cadastro de usuário com validação básica e retorno de token + user
 */
router.post("/register", async (req, res) => {
    try {
        await (0, userController_js_1.registerUser)(req, res);
    }
    catch (error) {
        console.error("Erro em /auth/register:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "teste@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
/**
 * Rota: POST /auth/login
 * Login com autenticação JWT
 */
router.post("/login", async (req, res) => {
    try {
        await (0, userController_js_1.loginUser)(req, res);
    }
    catch (error) {
        console.error("Erro em /auth/login:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});
// Exporta o roteador para uso em outros arquivos
exports.default = router;
//# sourceMappingURL=authRoutes.js.map