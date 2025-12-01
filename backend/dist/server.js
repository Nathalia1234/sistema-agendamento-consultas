// Importa o Express
import express from "express";
// Importa o CORS para permitir requisições de outras origens
import cors from "cors";
// Importa o dotenv para variáveis de ambiente
import dotenv from "dotenv";
// Importa a configuração do Swagger
import { swaggerDocs } from "./swagger.config.js";
// Importa o Swagger UI Express
import swaggerUi from "swagger-ui-express";
// Importa a conexão com o banco de dados
import { connectDatabase } from "./database/connection.js";
// Importa as rotas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
//import medicoRoutes from "./routes/medicoRoutes.js";
//import pacienteRoutes from "./deprecated/pacienteRoutes.js";
//import protectedRoutes from "./deprecated/protectedRoutes.js";
// Importa a configuração do Swagger
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
// Cria a aplicação Express
const app = express();
// Configura o CORS para permitir requisições de origens específicas
app.use(cors({
    origin: ["https://vercel.com/nathe557-4498s-projects/sistema-agendamento-consultas", "http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Documentação Swagger (opcional para apresentação)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Configura o Express para interpretar JSON
app.use(express.json());
// Conecta ao banco Neon
connectDatabase();
// Configuração do Swagger
swaggerDocs(app);
// Rotas principais do sistema
// Rotas de autenticação e usuários
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
// Rotas de consultas
app.use("/consultas", consultaRoutes);
// Rotas de médicos
//app.use("/medicos", medicoRoutes);
// Rotas de pacientes
//app.use("/pacientes", pacienteRoutes);
// Rotas protegidas
//app.use("/protected", protectedRoutes);
// -----------------------------
// Rota base — para teste local e vercel
// -----------------------------
app.get("/", (req, res) => {
    res.json({
        status: "✅ Online",
        message: "Sistema de Agendamento de Consultas - API funcionando.",
    });
});
// Erro 404 para endpoints não encontrados
app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada",
        path: req.originalUrl,
    });
});
// Inicialização do servidor
const PORT = process.env.PORT || 3000;
// Inicia o servidor na porta especificada
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
// -----------------------------
// Export do app — necessário pro Vercel
// -----------------------------
export default app;
//# sourceMappingURL=server.js.map