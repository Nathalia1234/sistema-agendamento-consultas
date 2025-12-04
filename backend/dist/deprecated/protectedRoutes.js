"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = __importDefault(require("../middlewares/authMiddleware.js"));
// Cria um roteador para rotas protegidas
const router = (0, express_1.Router)();
// Rota protegida que requer autenticação
router.get("/", authMiddleware_js_1.default, (req, res) => {
    res.status(200).json({ message: "✅ Acesso à rota protegida autorizado!" });
});
// Exporta o roteador para uso em outras partes da aplicação
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Rotas Protegidas
 *   description: Endpoints que requerem autenticação JWT
 */
/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Testa o acesso à rota protegida
 *     tags: [Rotas Protegidas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado à rota protegida
 *       401:
 *         description: Token não fornecido ou inválido
 */ 
//# sourceMappingURL=protectedRoutes.js.map