import { Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

// Controlador para registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para login de usuário
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json(token);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

//  Controlador para obter todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// Controlador para atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(parseInt(id), req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para excluir um usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id));
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

