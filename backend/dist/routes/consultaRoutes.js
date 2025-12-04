"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = __importDefault(require("../middlewares/authMiddleware.js"));
const consultaController_js_1 = require("../controllers/consultaController.js");
const router = (0, express_1.Router)();
// Criar
router.post("/", authMiddleware_js_1.default, consultaController_js_1.createConsulta);
// Listar todas do usuário
router.get("/", authMiddleware_js_1.default, consultaController_js_1.getConsultas);
// Atualizar
router.put("/:id", authMiddleware_js_1.default, consultaController_js_1.updateConsulta);
// Excluir
router.delete("/:id", authMiddleware_js_1.default, consultaController_js_1.deleteConsulta);
exports.default = router;
//# sourceMappingURL=consultaRoutes.js.map