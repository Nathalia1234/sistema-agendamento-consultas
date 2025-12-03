"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = require("../middlewares/authMiddleware.js");
const userController_js_1 = require("../controllers/userController.js");
const router = (0, express_1.Router)();
// Rota protegida para obter dados do usuário autenticado
router.get("/me", authMiddleware_js_1.authMiddleware, userController_js_1.getUserProfile);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints relacionados aos usuários
 */
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obter dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */ 
//# sourceMappingURL=userRoutes.js.map