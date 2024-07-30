import 'dotenv/config';
import * as express from 'express';
import Database from './config/database'; // ajuste o caminho conforme necessário
import usersRouter from './routes/UsersRouter'; // ajuste o caminho conforme necessário
import { swaggerUi, swaggerSpec } from '../swaggerConfig'; // ajuste o caminho conforme necessário
import authRouter from './routes/AuthRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conecte-se ao banco de dados
Database.getInstance();

// Rotas
app.use('/api', authRouter);
app.use('/api', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});