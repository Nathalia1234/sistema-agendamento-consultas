import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createConsulta,
  getConsultas,
  updateConsulta,
  deleteConsulta,
} from "../controllers/consultaController.js";

const router = Router();

// Criar
router.post("/", authMiddleware, createConsulta);

// Listar todas do usuário
router.get("/", authMiddleware, getConsultas);

// Atualizar
router.put("/:id", authMiddleware, updateConsulta);

// Excluir
router.delete("/:id", authMiddleware, deleteConsulta);

export default router;
