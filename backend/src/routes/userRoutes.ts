import { Router } from "express";
import { getAllUsers, registerUser, loginUser, updateUser, deleteUser   } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Cria um roteador para rotas de usuário
const router = Router();

// Rota para registro
router.post("/register", registerUser);

// Rota para login
router.post("/login", loginUser);

// Rota para listar todos os usuários (protegida por autenticação)
router.get("/users", authMiddleware, getAllUsers);

// Rota para atualizar um usuário (protegida por autenticação)
router.put("/users/:id", authMiddleware, updateUser);

// Rota para excluir um usuário (protegida por autenticação)
router.delete("/users/:id", authMiddleware, deleteUser);

// Rota de exemplo protegida
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Acesso autorizado. Esta é uma rota protegida!" });
});

// Exporta o roteador para uso em outras partes da aplicação
export default router;
