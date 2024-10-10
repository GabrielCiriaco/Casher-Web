# Casher-Web

<strong>Casher-Web</strong> é um projeto web em desenvolvimento que visa fornecer uma plataforma para gerenciar transações financeiras, categorias e usuários. O projeto é composto por um banco de dados PostgreSQL, uma API backend desenvolvida com Node.js e Express, e um frontend em Angular (a fazer).

## Estrutura

### Banco
Apesar de utilizar o typeORM no projeto da Api, optei por não usar as migrations e criar o banco previamente, nessa pasta se encontram os códigos SQL das tabelas criadas necessárias para armazenar as informações.

### Back
Nesta pasta está o código da api que se conecta ao banco PostgreSQL disponibiliza as rotas que serão utilizadas pela aplicação Angular futuramente.
#### Rotas
- POST: /login (Fazer o login para receber o token de autenticação)
- POST: /createUser (Criar usuário)
- GET: /users (Listar todos os usuários)
- GET: /users/:id (Visulizar usiário por id)
- PUT: /users/:id (Atualizar informações de usuário por id)
- DELETE: /users/:id (Deletar usuário por id)
- POST: /createCategory (Criar categoria)
- GET: /getAllCategories (Listar categorias do usuário, o usuário é identificado no token de autenticação)
- PUT: /updateCategory (Atualizar categoria)
- PUT: /enableCategory (Habilitar categoria)
- PUT: /disableCategory (Desabilitar categoria)
- POST: /createTransaction (Cria uma transação)
