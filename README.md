#  Sistema de Agendamento de Consultas — Backend

##  Introdução

O **Sistema de Agendamento de Consultas** é um projeto desenvolvido em **TypeScript**, com o objetivo de gerenciar consultas médicas, pacientes e médicos de forma segura e eficiente.  

Esta aplicação representa o **módulo de backend**, responsável pela lógica de negócio, autenticação de usuários e comunicação com o banco de dados hospedado na **plataforma Neon** (PostgreSQL em nuvem).

O projeto foi desenvolvido como parte da atividade da 3° unidade, na disciplina de Desenvolvimento Full Stack. 

---

##  Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| Linguagem | TypeScript |
| Servidor | Node.js + Express |
| Banco de Dados | PostgreSQL (Neon Cloud) |
| Autenticação | JWT (Json Web Token) |
| Segurança | bcrypt para criptografia de senhas |
| Ambiente | dotenv |
| ORM/Driver | pg |
| Testes de rotas | Insomnia |

---

##  Estrutura de Diretórios

![Estrutura de diretórios](/backend/img/estrutura_pasta.png) 

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

## Estrutura do Banco de Dados

As tabelas principais criadas no Neon são:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE pacientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT,
  telefone VARCHAR(20),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE medicos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE consultas (
  id SERIAL PRIMARY KEY,
  paciente_id INT NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
  medico_id INT NOT NULL REFERENCES medicos(id) ON DELETE CASCADE,
  data_consulta TIMESTAMP NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---

## Documentação das Rotas

### Autenticação (/api)
| Método | Rota        | Descrição                              |
| ------ | ----------- | -------------------------------------- |
| POST   | `/register` | Cria um novo usuário                   |
| POST   | `/login`    | Realiza o login e retorna um token JWT |


### Usuários (/api/users)
| Método | Rota         | Descrição                                |
| ------ | ------------ | ---------------------------------------- |
| GET    | `/users`     | Lista todos os usuários (rota protegida) |
| PUT    | `/users/:id` | Atualiza os dados de um usuário          |
| DELETE | `/users/:id` | Remove um usuário do sistema             |


### Consultas (/api/consultas)
| Método | Rota             | Descrição                        |
| ------ | ---------------- | -------------------------------- |
| POST   | `/consultas`     | Cria uma nova consulta           |
| GET    | `/consultas`     | Lista todas as consultas         |
| GET    | `/consultas/:id` | Retorna uma consulta específica  |
| PUT    | `/consultas/:id` | Atualiza informações da consulta |
| DELETE | `/consultas/:id` | Exclui uma consulta              |

### Pacientes (/api/pacientes)
| Método | Rota             | Descrição                  |
| ------ | ---------------- | -------------------------- |
| POST   | `/pacientes`     | Cadastra um novo paciente  |
| GET    | `/pacientes`     | Lista todos os pacientes   |
| GET    | `/pacientes/:id` | Busca um paciente por ID   |
| PUT    | `/pacientes/:id` | Atualiza dados do paciente |
| DELETE | `/pacientes/:id` | Remove paciente do sistema |


### Médicos (/api/medicos)
| Método | Rota           | Descrição                      |
| ------ | -------------- | ------------------------------ |
| POST   | `/medicos`     | Cadastra um médico             |
| GET    | `/medicos`     | Lista todos os médicos         |
| GET    | `/medicos/:id` | Retorna um médico por ID       |
| PUT    | `/medicos/:id` | Atualiza informações do médico |
| DELETE | `/medicos/:id` | Exclui um médico do sistema    |

---

#  Roteiro de Testes  (Insomnia)  

As rotas foram testadas e organizadas no Insomnia, agrupadas da seguinte forma:

![Rotas1](/backend/img/Insomnia_autenticacao_usuarios.png) 

![Rotas2](/backend/img/Insomnia_consultas_pacientes_medicos.png) 


### Inicialização do Servidor Backend
Demonstra que o backend foi iniciado com sucesso e estabeleceu conexão com o banco de dados PostgreSQL hospedado no Neon, garantindo o funcionamento do sistema para as próximas rotas.

![Inicializacao_Server](/backend/img/Inicializacao_Servidor.png) 


### Cadastro de usuário com sucesso

![Rota_Registro](/backend/img/Registro_usuario.png) 


### Login funcional e geração de JWT

![Rota_Login](/backend/img/Login_usuario.png) 

### Listagem de Usuários
Apresenta a rota protegida `GET /api/users`, exibindo os usuários cadastrados com token válido.

![Rota_Listagem_Users](/backend/img/Listagem_Usuarios.png) 

### Cadastro de paciente com sucesso

![Rota_Cadastro_Paciente](/backend/img/Cadastro_Paciente.png) 


### Cadastro de médico funcional 

![Rota_Cadastro_Medico](/backend/img/Cadastro_Medico.png) 


### Agendamento de consulta vinculado ao paciente e médico
Demonstra a criação de uma nova consulta via `POST /api/consultas`.

![Rota_Criacao_Consulta](/backend/img/Criar_Consulta.png) 


### Listagem de consultas registradas
Exibe o retorno da rota `GET /api/consultas`, com consultas listadas do banco Neon.

![Rota_Listagem_Consulta](/backend/img/Listagem_Consulta.png) 

### Exclusão de consulta com mensagem de sucesso

![Rota_Exclusao_Consulta](/backend/img/Exclusao_Consulta.png) 


### Informações no Banco Neon

- Tabela **Users**:
![Info_Banco](/backend/img/Banco_Usuarios.png) 

- Tabela **Consultas**:
![Info_Banco](/backend/img/Banco_Consultas.png) 

- Tabela **Médicos**:
![Info_Banco](/backend/img/Banco_Medicos.png) 

- Tabela **Pacientes**:
![Info_Banco](/backend/img/Banco_Pacientes.png) 





--- 

# Como Executar o Projeto

### 1. Clonar o repositório
```
git clone https://github.com/Nathalia1234/sistema-agendamento-consultas.git
cd backend
```

### 2. Instalar as dependências
```
npm install
```

### 3. Configurar o arquivo .env
```
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/nomedb?sslmode=require
JWT_SECRET=chave_super_secreta_gerada
PORT=3000
```

### 4. Executar o servidor
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


Caso rode em procução (Vercel):  https://sistema-consultas-backend.vercel.app/api-docs 


###  Exemplos de Visualização
1. **Tela inicial do Swagger** com todas as rotas listadas:

![Swagger](/backend/img/Swagger1.png) 

![Swagger](/backend/img/Swagger2.png) 


1. **Exemplo de requisição POST (criar consulta)**:

![Swagger](/backend/img/Consultas_Swagger.png) 


2. **Exemplo de requisição GET (listar consultas)**:

![Swagger](/backend/img/Listar_Consulta_Swagger.png) 


Essas imagens demonstram o funcionamento e a integração bem-sucedida entre backend, banco de dados e documentação.

---

# Deploy na Vercel

O backend do projeto Sistema de Agendamento de Consultas foi implantado com sucesso na plataforma Vercel, garantindo acesso público e integração direta com o banco de dados Neon PostgreSQL.

🔗 URL pública da API: https://sistema-agendamento-consultas-phi.vercel.app/ 

Configurações do Deploy:

- **Framework**: Node.js (TypeScript)
- **Root Directory**: ./
- **Build Command**: npm run build
- **Output Directory**: dist
- **Environment Variables**:
  - **DATABASE_URL** → URL de conexão do banco Neon
  - **JWT_SECRET** → chave secreta para autenticação JWT

### Teste de Funcionamento

Durante os testes pós-deploy, foi possível confirmar o funcionamento correto das rotas. Abaixo, um exemplo de requisição GET à rota **/api/consultas**, retornando dados reais do banco Neon:

![Swagger](/backend/img/Teste_Vercel.png) 

--- 

# Conclusão

O backend do **Sistema de Agendamento de Consultas** fornece a base lógica e estrutural para o gerenciamento de usuários, médicos, pacientes e consultas, com autenticação via JWT e integração direta com o banco **Neon PostgreSQL.**

O projeto reforça os conceitos de **arquitetura em camadas, segurança de dados e desenvolvimento orientado a serviços (REST)**, fundamentais para aplicações reais na área da saúde e gestão de sistemas.