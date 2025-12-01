import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "../models/userModel.js";
const JWT_SECRET = process.env.JWT_SECRET || "admin123";
// -------------------------
// REGISTRO DE USUÁRIO
// -------------------------
export async function registerUser(req, res) {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Preencha todos os campos." });
        }
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: "E-mail já cadastrado." });
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = await createUser(nome, email, hashedPassword);
        return res.status(201).json({
            message: "Usuário registrado com sucesso!",
            user: newUser,
        });
    }
    catch (error) {
        console.error("ERRO AO REGISTRAR:", error);
        return res.status(500).json({ error: "Erro ao registrar usuário." });
    }
}
// -----------------------------------
// LOGIN
// -----------------------------------
export async function loginUser(req, res) {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ error: "Informe e-mail e senha." });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(400).json({ error: "Senha incorreta." });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao realizar login." });
    }
}
// -----------------------------------
// PERFIL DO USUÁRIO AUTENTICADO
// -----------------------------------
export async function getUserProfile(req, res) {
    try {
        const userId = req.user.id; // <--- CORRETO
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res.status(200).json({
            id: user.id,
            nome: user.nome,
            email: user.email,
        });
    }
    catch (error) {
        console.error("Erro ao obter perfil:", error);
        return res.status(500).json({ error: "Erro interno ao buscar perfil." });
    }
}
//# sourceMappingURL=userController.js.map