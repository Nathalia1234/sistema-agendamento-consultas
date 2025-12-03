"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.createUser = createUser;
const connection_js_1 = require("../database/connection.js");
// ================================
// BUSCAR USUÁRIO POR E-MAIL
// ================================
async function findUserByEmail(email) {
    const query = "SELECT * FROM users  WHERE email = $1 LIMIT 1;";
    const values = [email];
    const result = await connection_js_1.pool.query(query, values);
    return result.rows[0]; // retorna undefined se não encontrar
}
// ================================
// BUSCAR USUÁRIO POR ID
// ================================
async function findUserById(id) {
    const query = "SELECT * FROM users  WHERE id = $1 LIMIT 1;";
    const values = [id];
    const result = await connection_js_1.pool.query(query, values);
    return result.rows[0];
}
// ================================
// CRIAR NOVO USUÁRIO
// ================================
async function createUser(nome, email, senha) {
    const query = `
    INSERT INTO users  (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email;
  `;
    const values = [nome, email, senha];
    const result = await connection_js_1.pool.query(query, values);
    return result.rows[0];
}
//# sourceMappingURL=userModel.js.map