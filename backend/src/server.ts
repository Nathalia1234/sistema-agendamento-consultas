import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDatabase } from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

import { swaggerDocs } from "./swagger.config.js";


dotenv.config();

const app = express();
app.use(cors({origin: ["https://vercel.com/nathe557-4498s-projects/sistema-agendamento-consultas"],methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
  

app.use(express.json());

// Conecta ao banco Neon
connectDatabase();

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
app.use("/api/protected", protectedRoutes);

// Swagger
swaggerDocs(app);


// Porta de execução
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando na porta ${PORT}`)
);
