import { Router } from "express";
import { listarMedicos, buscarMedicoPorId, criarMedico, atualizarMedico, deletarMedico } from "../controllers/medicoController.js";

const router = Router();

// Criar médico
router.post("/", criarMedico);

// Listar todos os médicos
router.get("/", listarMedicos);

// Buscar médico por ID
router.get("/:id", buscarMedicoPorId);

// Atualizar médico
router.put("/:id", atualizarMedico);

// Deletar médico
router.delete("/:id", deletarMedico);

export default router;
