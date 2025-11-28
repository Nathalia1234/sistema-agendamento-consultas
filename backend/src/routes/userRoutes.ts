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