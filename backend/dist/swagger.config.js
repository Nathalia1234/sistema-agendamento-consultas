"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = swaggerDocs;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Configuração do Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API - Sistema de Consultas Médicas",
            version: "1.0.0",
            description: "Documentação completa das rotas da API do Sistema de Consultas Médicas.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local",
            },
            {
                url: "https://sistema-agendamento-consultas-eight.vercel.app",
                description: "Servidor em produção (Vercel)",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Gera docs a partir das rotas
};
// Gera a especificação do Swagger
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// Função para configurar o Swagger na aplicação Express
function swaggerDocs(app) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log("✅ Swagger rodando em: http://localhost:3000/api-docs");
}
//# sourceMappingURL=swagger.config.js.map