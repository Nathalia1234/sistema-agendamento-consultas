import { Router } from "express";
import { criarPaciente, listarPacientes, buscarPacientePorId, atualizarPaciente, deletarPaciente } from "../controllers/pacienteController.js";
const router = Router();
router.post("/", criarPaciente);
router.get("/", listarPacientes);
router.get("/:id", buscarPacientePorId);
router.put("/:id", atualizarPaciente);
router.delete("/:id", deletarPaciente);
export default router;
//# sourceMappingURL=pacienteRoutes.js.map