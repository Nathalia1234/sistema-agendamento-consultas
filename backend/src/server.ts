// Importa o Express
import express from "express";
// Importa o CORS para permitir requisições de outras origens
import cors from "cors";
// Importa o dotenv para variáveis de ambiente
import dotenv from "dotenv";

// Importa a conexão com o banco de dados
import { connectDatabase } from "./database/connection.js";
// Importa as rotas
import userRoutes from "./routes/userRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
// Importa a configuração do Swagger
import { swaggerDocs } from "./swagger.config.js";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
// Cria a aplicação Express
const app = express();

// Configura o CORS para permitir requisições de origens específicas
app.use(cors({origin: ["https://vercel.com/nathe557-4498s-projects/sistema-agendamento-consultas"],methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
  
// Configura o Express para interpretar JSON
app.use(express.json());

// Conecta ao banco Neon
connectDatabase();


// Configuração do Swagger
swaggerDocs(app);


// Rotas principais
app.use("/api", userRoutes);

// Rotas de consultas
app.use("/api/consultas", consultaRoutes);

// Rotas de médicos
app.use("/api/medicos", medicoRoutes);

// Rotas de pacientes
app.use("/api/pacientes", pacienteRoutes);

// Rotas de autenticação
app.use("/api/users", authRoutes);

// Rotas protegidas
app.use("/api/protected", protectedRoutes);



// -----------------------------
// Rota base — para teste local e vercel
// -----------------------------
app.get("/", (req, res) => {
  res.send("✅ API está rodando com sucesso!");
});

// Porta de execução
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando na porta ${PORT}`)
);

// -----------------------------
// Export do app — necessário pro Vercel
// -----------------------------
export default app;