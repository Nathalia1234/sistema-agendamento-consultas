import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserProfile } from "../controllers/userController.js";
const router = Router();
// Rota protegida para obter dados do usuário autenticado
router.get("/me", authMiddleware, getUserProfile);
export default router;
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