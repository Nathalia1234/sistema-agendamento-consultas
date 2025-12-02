import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Cria um roteador para rotas protegidas
const router = Router();

// Rota protegida que requer autenticação
router.get("/", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ Acesso à rota protegida autorizado!" });
});

// Exporta o roteador para uso em outras partes da aplicação
export default router;

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