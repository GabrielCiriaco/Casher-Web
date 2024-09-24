import { Request, Response } from 'express';
import TransactionsService from '../services/TransactionsService';
import { Transactions } from '../entities/Transactions';

class TransactionsControlller {
    private transactionsService = new TransactionsService();

    constructor() {
        this.transactionsService = new TransactionsService();
    }

    public async createTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const { data, description, value, category_id } = req.body;
            const user_id = req.body.user.id;

            const transaction: Partial<Transactions> = {
                data,
                description,
                value,
                category_id,
                user_id
            }

            const newTransaction = await this.transactionsService.createTransaction(transaction);

            return res.status(201).json(newTransaction);

        } catch (error) {
            console.error('Erro em TransactionsRepository createTransaction()');
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    }
}

export default TransactionsControlller; 