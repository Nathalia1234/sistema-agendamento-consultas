import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Configura a conexão com o banco de dados PostgreSQL no Neon
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Função para testar a conexão
export const connectDatabase = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Conectado ao banco de dados Neon com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados Neon:", error);
  }
};
