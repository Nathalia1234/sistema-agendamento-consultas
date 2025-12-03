import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

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
const swaggerSpec = swaggerJsdoc(options);

// Função para configurar o Swagger na aplicação Express
export function swaggerDocs(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger rodando em: http://localhost:3000/api-docs");
}
