import { Router } from "express";
import {
  createConsulta,
  getConsultas,
  getConsultaById,
  updateConsulta,
  deleteConsulta,
} from "../controllers/consultaController.js";

const router = Router();

router.post("/", createConsulta);
router.get("/", getConsultas);
router.get("/:id", getConsultaById);
router.put("/:id", updateConsulta);
router.delete("/:id", deleteConsulta);

export default router;
