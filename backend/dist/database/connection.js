"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configura a conexão com o banco de dados PostgreSQL no Neon
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
// Função para testar a conexão
const connectDatabase = async () => {
    try {
        await exports.pool.query("SELECT NOW()");
        console.log("✅ Conectado ao banco de dados Neon com sucesso!");
    }
    catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados Neon:", error);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=connection.js.map