import 'dotenv/config';
import * as express from 'express';
import Database from './config/database'; // ajuste o caminho conforme necessário
import usersRouter from './routes/usersRouter'; // ajuste o caminho conforme necessário
import { swaggerUi, swaggerSpec } from '../swaggerConfig'; // ajuste o caminho conforme necessário

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Conecte-se ao banco de dados
Database.getInstance();

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use o roteador de usuários
app.use('/api', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
