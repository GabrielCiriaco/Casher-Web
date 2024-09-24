import TransactionsRepository from '../repositories/TransactionsRepository';
import { Transactions } from '../entities/Transactions';
import { TransactionsCategories } from '../types/transactionCategory';
import * as bcrypt from 'bcrypt';

class TransactionsService{
    private transactionsRepository: TransactionsRepository;

    constructor() {
        this.transactionsRepository = new TransactionsRepository();
    }

    public async createTransaction(transaction: Partial<Transactions>): Promise<Transactions> {
        try {
            return this.transactionsRepository.create(transaction);
        } catch (error) {
            console.error('Erro em TransactionsRepository createTransaction()');
            throw new Error(`Erro ao criar transação: ${error}`);
        }
    }

    public async getAllTransactions(user_id: number): Promise<Transactions[]> {
        try {
            return this.transactionsRepository.findAll(user_id);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw new Error(`Erro ao buscar todas as transações: ${error}`);
        }
    }

    public async getTransaction(id: number): Promise<Transactions | null> {
        try {
            return this.transactionsRepository.findById(id);
        } catch (error) {
            console.error('Error fetching transaction:', error);
            throw new Error(`Erro ao buscar a transação: ${error}`);
        }
    }

    public async getTransactionByCategoryOnGroup(category_id: number, user_id: number): Promise<TransactionsCategories[]> {
        try {
            return this.transactionsRepository.findByCategoryOnGroup(category_id, user_id);
        } catch (error) {
            console.error('Error fetching transaction:', error);
            throw new Error(`Erro ao buscar a transação: ${error}`);
        }
    }
    
    public async getTransactionByTypeOnGroup(type: string, user_id: number): Promise<TransactionsCategories[]> {
        try {
            return this.transactionsRepository.findByTypeOnGroup(type, user_id);
        } catch (error) {
            console.error('Error fetching transaction:', error);
            throw new Error(`Erro ao buscar a transação: ${error}`);
        }
    }

}

export default TransactionsService;