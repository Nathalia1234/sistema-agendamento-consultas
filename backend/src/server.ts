import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
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



// Porta de execução
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando na porta ${PORT}`)
);
