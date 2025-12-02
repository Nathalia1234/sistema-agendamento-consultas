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

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: ["http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

// DB
connectDatabase();
swaggerDocs(app);

// Rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/consultas", consultaRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "API funcionando!"
  });
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
const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  // Executando localmente
  app.listen(PORT, () => {
    console.log(`🔥 Servidor local rodando na porta ${PORT}`);
  });
}

// Exporta o app para a Vercel
export default app;
