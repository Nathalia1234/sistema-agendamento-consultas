
#  Sistema de Agendamento de Consultas

Este repositório contém a entrega oficial da **Sprint Final**, focada no desenvolvimento de um **Produto Mínimo Viável (MVP)** para agendamento de consultas.

A aplicação foi desenvolvida utilizando  **React (Vite) + Node.js (Express)**, com banco de dados **PostgreSQL** hospedado na nuvem (Neon) e documentação via **Swagger**.

##  Objetivo do Projeto

O foco desta entrega foi simplificar a arquitetura para garantir a **robustez do ciclo principal**: a conexão entre um Usuário e uma Consulta.

**Funcionalidades Principais:**
- **Autenticação:** Cadastro e Login de usuários via JWT.
- **Agendamento:** Criação de novas consultas validando horários.
- **Gestão:** Listagem e cancelamento de consultas marcadas.
- **Observabilidade:** Feedback visual de erros e status do servidor.

---

##  Tecnologias Utilizadas

| Categoria       | Tecnologias             |
| --------------- | ----------------------- |
| **Frontend** | React, Vite, TypeScript |
| **Backend** | Node.js, Express        |
| **Banco** | PostgreSQL (Neon Cloud) |
| **ORM/Query** | SQL Nativo / PG Driver  |
| **Auth** | JWT + Bcrypt            |
| **Docs** | Swagger UI              |


---

##  Variáveis de Ambiente (.env)

As variáveis de ambiente devem ser configuradas na raiz do projeto:

```
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/nomedb?sslmode=require
JWT_SECRET=chave_super_secreta_gerada
PORT=3000
```

>  A variável `DATABASE_URL` é obtida diretamente no painel do **Neon**, e o campo `JWT_SECRET` deve ser uma chave única, gerada via terminal ou site de hash seguro.

--- 

##  Mapa de Dependências (Fluxo de Execução)

```text
Requisição → Rota → Controller → Service → Database (Neon)
                           ↓
                     Middleware (JWT)
```

Onde:
- Rotas (Routes): definem os endpoints da API.
- Controllers: recebem a requisição e acionam os serviços correspondentes.
- Services: contêm a lógica de negócio e interagem com o banco de dados.
- Middlewares: controlam autenticação e permissões via JWT.
- Models: representam a estrutura dos dados manipulados no banco.

--- 

## Estrutura do Banco de Dados (PostgreSQL - Neon)

Neste projeto, a arquitetura foi otimizada para trabalhar com duas entidades fundamentais que sustentam todo o sistema:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE consultas (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  data_consulta TIMESTAMP NOT NULL,
  descricao TEXT,
);
```

> A simplificação para tabelas de Users e Consultas permitiu focar na integridade das transações e na performance da API, garantindo que o fluxo principal (Agendar/Cancelar) funcione sem falhas.


--- 
## Rotas da API (Endpoints)

### Autenticação (/auth)
| Método | Rota        | Descrição                              |
| ------ | ----------- | -------------------------------------- |
| POST   | `/register` | Cria um novo usuário no sistema.       |
| POST   | `/login`    | Realiza o login e retorna um token JWT |


### Consultas (/consultas)
| Método | Rota             | Descrição                        |
| ------ | ---------------- | -------------------------------- |
| POST   | `/consultas`     | Cria uma nova consulta           |
| GET    | `/consultas`     | Lista todas as consultas do usuário logado.        |
| GET    | `/consultas/:id` | Retorna uma consulta específica  |
| PUT    | `/consultas/:id` | Atualiza informações da consulta |
| DELETE | `/consultas/:id` | Exclui uma consulta              |

> A documentação completa e interativa pode ser acessada via Swagger em /api-docs quando o servidor estiver rodando.
---

### Inicialização do Servidor Backend
Demonstra que o backend foi iniciado com sucesso e estabeleceu conexão com o banco de dados PostgreSQL hospedado no Neon, garantindo o funcionamento do sistema para as próximas rotas.

![Inicializacao_Server](/backend/img/Inicializacao_Servidor.png) 


### Informações no Banco Neon


--- 

# Como Executar o Projeto

### 1. Clonar o repositório
```
git clone https://github.com/Nathalia1234/sistema-agendamento-consultas.git
```

### 2. Configure o Backend:
```
cd backend
npm install
# Crie um arquivo .env com suas credenciais:
# DATABASE_URL=...
# JWT_SECRET=...
npm run dev
```

### 3. Configure o Frontend:
```
cd frontend
npm install
npm run dev
```

### 4. Rodar localmente
```
npm run dev
```

O servidor será iniciado em:
```
http://localhost:3000
```

--- 

# Documentação com Swagger

A API foi documentada utilizando o **Swagger UI**, permitindo visualizar e testar todas as rotas disponíveis no sistema de consultas médicas.

###  Como acessar
Após rodar o servidor localmente, pode ser acessado pelo link: http://localhost:3000/api-docs 


---

# Deploy na Vercel

O backend e o frontend do projeto Sistema de Agendamento de Consultas foram implantados com sucesso na plataforma Vercel, garantindo acesso público e integração direta com o banco de dados Neon PostgreSQL.

🔗 URL pública da API: [Backend](https://sistema-agendamento-consultas-three.vercel.app/) 

🔗 URL pública da API: [Frontend](https://sistema-agendamento-consultas-fo6l.vercel.app/) 

Configurações do Deploy Backend:

- **Framework**: Express
- **Root Directory**: backend
- **Build Command**: desativado
- **Output Directory**: desativado
- **Environment Variables**:
  - **DATABASE_URL** → URL de conexão do banco Neon
  - **JWT_SECRET** → chave secreta para autenticação JWT
  - **PORT** → 3000

Configurações do Deploy Frontend:

- **Framework**: Vite
- **Root Directory**: frontend
- **Build Command**: npm run build
- **Output Directory**: dist
- **Install Command**: npm install
- **Environment Variables**:
  - **VITE_API_URL** → URL de conexão com o banckend em produção


--- 

