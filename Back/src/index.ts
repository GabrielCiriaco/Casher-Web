import 'dotenv/config';
import * as express from 'express';
import Database from './config/database'; // ajuste o caminho conforme necessário
import usersRouter from './routes/UsersRouter'; // ajuste o caminho conforme necessário
import authRouter from './routes/AuthRouter';
import categoriesRouter from './routes/CategoriesRouter'; // ajuste o caminho conforme necessário
import transactionsRouter from './routes/TransactionsRouter'; // ajuste o caminho conforme necessário

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conecte-se ao banco de dados
Database.getInstance();

// Rotas
app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', categoriesRouter);
app.use('/api', transactionsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});