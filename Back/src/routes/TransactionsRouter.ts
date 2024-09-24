import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const transactionController = new TransactionsController();

router.post('/createTransaction', authMiddleware, transactionController.createTransaction.bind(transactionController));


export default router;