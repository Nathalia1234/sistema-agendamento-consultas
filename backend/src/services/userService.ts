import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../database/connection.js";

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

// Serviço para gerenciar usuários
export class UserService {
  // Registro de um novo usuário
  async register(user: User) {
    const { name, email, password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    return result.rows[0];
  }

  // Login de usuário
  async login(email: string, password: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) throw new Error("Usuário não encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Senha inválida");

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { token };
  }

  // Obter todos os usuários
  async getAllUsers() {
  const result = await pool.query(
    "SELECT id, name, email FROM users ORDER BY id ASC"
  );
  return result.rows;
  }
  
// Atualizar informações do usuário
async updateUser(id: number, data: any) {
  const { name, email, password } = data;

  // Se houver uma nova senha, gera o hash
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const result = await pool.query(
    `UPDATE users
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         password = COALESCE($3, password)
     WHERE id = $4
     RETURNING id, name, email`,
    [name, email, hashedPassword, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Usuário não encontrado.");
  }

  return result.rows[0];
  }
  
// Deletar usuário
  async deleteUser(id: number) {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);

  if (result.rows.length === 0) {
    throw new Error("Usuário não encontrado.");
  }

  return result.rows[0];
}

}
