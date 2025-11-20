import { UserService } from "../services/userService.js";
const userService = new UserService();
export const registerUser = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
//  Nova função para listar usuários
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(parseInt(id), req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(parseInt(id));
        res.status(200).json({ message: "Usuário excluído com sucesso." });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//# sourceMappingURL=userController.js.map