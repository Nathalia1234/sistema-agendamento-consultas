"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_js_1 = require("./swagger.config.js");
const connection_js_1 = require("./database/connection.js");
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const consultaRoutes_js_1 = __importDefault(require("./routes/consultaRoutes.js"));
// -----------------------------
// Carrega as variáveis de ambiente (.env)
// -----------------------------
dotenv_1.default.config();
// -----------------------------
// Inicializa o app Express
// -----------------------------
const app = (0, express_1.default)();
// -----------------------------
// Middlewares globais
// -----------------------------
app.use((0, cors_1.default)({
    origin: [
        "https://sistema-agendamento-consultas-fo6l.vercel.app", // frontend deployado
        "http://localhost:8080" // frontend local
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// -----------------------------
// Body parser
// -----------------------------
app.use(express_1.default.json());
// -----------------------------
// Conecta ao Neon
// -----------------------------
(0, connection_js_1.connectDatabase)();
// -----------------------------
// Inicializar o Swagger
// -----------------------------
(0, swagger_config_js_1.swaggerDocs)(app);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_js_1.swaggerDocs));
// -----------------------------
// Rotas principais
// -----------------------------
app.use("/auth", authRoutes_js_1.default);
app.use("/users", userRoutes_js_1.default);
app.use("/consultas", consultaRoutes_js_1.default);
// -----------------------------
// Rota base — para teste local e vercel
// -----------------------------
app.get("/", (req, res) => {
    res.status(200).json({ message: "✅ API do Sistema de Agendamento de Consultas está online!" });
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
exports.default = app;
//# sourceMappingURL=server.js.map