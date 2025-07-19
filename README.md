# 🏥 Projeto API

![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 Descrição

API RESTful desenvolvida para o sistema de gerenciamento de clínicas de saúde ocupacional, responsável por controlar agendamentos, pacientes, médicos e prontuários de anamnese.

Este projeto foi desenvolvido como parte da discipilna de Programaçao Web na Fatec Ribeirão Preto.

## ✨ Funcionalidades Principais

* Autenticação de usuários baseada em JWT (JSON Web Tokens).
* Gerenciamento de usuários com diferentes níveis de acesso (Admin, Médico, Paciente).
* Conversar com o banco de dados para ler e salvar informações.
* Documentação da API gerada automaticamente com Swagger.
* Testes unitários e de integração com Jest.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js
* **Framework:** Express.js
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Testes:** Jest & Supertest
* **Documentação:** Swagger

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura bem definida para separação de responsabilidades:

-   `src/controllers`: Recebem as requisições HTTP e retornam as respostas.
-   `src/database`: Contém o `data-source` (configuração do TypeORM) e as `migrations`.
-   `src/docs`: Arquivos de configuração e o JSON gerado pelo Swagger.
-   `src/middlewares`: Funções que interceptam as requisições (autenticação, logs, etc.).
-   `src/models`: Definição das entidades do banco de dados (tabelas).
-   `src/repositories`: Camada de abstração para acesso aos dados (lógica do banco).
-   `src/routers`: Definição dos endpoints da API.
-   `src/tests`: Testes automatizados.

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação no seu ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* [PostgreSQL](https://www.postgresql.org/download/) (ou uma instância rodando em Docker)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/josebarrosjr/projeto-api-progweb-fatec.git
    cd projeto-api-proggweb-fatec
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    * Crie uma cópia do arquivo `.env.example` (você pode criar este arquivo para facilitar) e renomeie para `.env`.
    * Preencha as variáveis no arquivo `.env` com suas credenciais do banco de dados local.

    **Exemplo de `.env`:**
    ```env
    # Porta da Aplicação
    PORT=3000

    # Banco de Dados (PostgreSQL)
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASS=sua_senha_local
    DATABASE_NAME=clinicajam_db

    # JWT
    JWT_SECRET=sua_chave_secreta_super_segura
    ```

4.  **Rode as migrations do TypeORM (para criar as tabelas):**
    ```bash
    npm run migration:run
    ```

5.  **Inicie o servidor em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

O servidor estará rodando em `http://localhost:3000`.

## 📚 Endpoints da API

A documentação completa de todos os endpoints está disponível e é gerada automaticamente pelo Swagger.

* **URL da Documentação:** `http://localhost:3000/docs`

A URL base para todas as chamadas da API é:
`http://localhost:3000/api/v1`

## 🧪 Testes

Para rodar a suíte de testes automatizados, execute o seguinte comando:

```bash
npm run test
```

## 📜 Scripts Disponíveis
`npm run dev`: Inicia o servidor em modo de desenvolvimento com nodemon.

`npm run build`: Compila o código TypeScript para JavaScript.

`npm run start`: Inicia o servidor em modo de produção (executa o código compilado).

`npm run test`: Roda os testes com Jest.

## ✒️ Autores

Audrey Francezi Coelho
- LinkedIn: https://www.linkedin.com/in/audrey-francezi-228094197/
- GitHub: https://github.com/AudFrancezi


José Pereira Barros Junior
- LinkedIn: https://www.linkedin.com/in/josebarrosjr/
- GitHub: https://github.com/josebarrosjr


Maurício da Silva Alves
- LinkedIn: https://www.linkedin.com/in/maur%C3%ADcio-alves-%F0%9F%8F%B3%EF%B8%8F%E2%80%8D%F0%9F%8C%88-7320b51a2/
- GitHub: https://github.com/Maurici0A
