import { pool } from "../database/connection.js";

// ================================
// BUSCAR USUÁRIO POR E-MAIL
// ================================
export async function findUserByEmail(email: string) {
  const query = "SELECT * FROM usuarios WHERE email = $1 LIMIT 1;";
  const values = [email];

  const result = await pool.query(query, values);
  return result.rows[0]; // retorna undefined se não encontrar
}

// ================================
// BUSCAR USUÁRIO POR ID
// ================================
export async function findUserById(id: number) {
  const query = "SELECT * FROM usuarios WHERE id = $1 LIMIT 1;";
  const values = [id];

  const result = await pool.query(query, values);
  return result.rows[0];
}

// ================================
// CRIAR NOVO USUÁRIO
// ================================
export async function createUser(name: string, email: string, senha: string) {
  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email;
  `;

  const values = [name, email, senha];

  const result = await pool.query(query, values);
  return result.rows[0];
}
