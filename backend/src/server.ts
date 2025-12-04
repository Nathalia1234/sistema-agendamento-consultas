// Importações
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger.config.js";

import { connectDatabase } from "./database/connection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

// -----------------------------
// Carrega as variáveis de ambiente (.env)
// -----------------------------
dotenv.config();

// -----------------------------
// Inicializa o app Express
// -----------------------------
const app = express();

// -----------------------------
// Middlewares globais
// -----------------------------
app.use(cors({
  origin: [
    "https://sistema-agendamento-consultas-fo6l.vercel.app", // frontend deployado
    "http://localhost:5173",
    "http://localhost:8080" // frontend local
   
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true
}));


// -----------------------------
// Body parser
// -----------------------------
app.use(express.json());

// -----------------------------
// Conecta ao Neon
// -----------------------------
connectDatabase();

// -----------------------------
// Inicializar o Swagger
// -----------------------------
swaggerDocs(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// -----------------------------
// Rotas principais
// -----------------------------
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/consultas", consultaRoutes);

// -----------------------------
// Rota base — para teste local e vercel
// -----------------------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "✅ API do Sistema de Agendamento de Consultas está online!"});
});


// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
    path: req.originalUrl
  });
});

// -----------------------------
// AMBIENTE LOCAL → app.listen()
// AMBIENTE VERCEL → NÃO roda servidor


// -----------------------------
// Porta de execução
// -----------------------------
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`✅ Servidor rodando localmente na porta ${PORT}`);
});

// -----------------------------
// Export do app — necessário pro Vercel
// -----------------------------
export default app;
