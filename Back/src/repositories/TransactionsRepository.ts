import { DataSource, Repository } from 'typeorm';
import { Transactions } from '../entities/Transactions';
import { Categories } from '../entities/Categories';
import { TransactionsCategories } from '../types/transactionCategory';
import Database from '../config/database';
import { Users } from '../entities/Users';
import UsersRepository from './UsersRepository';
import CategoriesRepository from './CategoriesRepository';

class TransactionsRepository {
    private dataSource: DataSource;
    private transactionsRepository: Repository<Transactions>;
    private usersRepository: UsersRepository;
    private categoryRepository: CategoriesRepository;

    constructor() {
        this.dataSource = Database.getInstance();
        this.transactionsRepository = this.dataSource.getRepository(Transactions);
        this.usersRepository = new UsersRepository();
        this.categoryRepository = new CategoriesRepository();
    }

    public findAll(user_id: number): Promise<Transactions[]> {
        try {
            return this.transactionsRepository.find({ where: { user_id } });
        } catch (error) {
            console.error('Erro em TransactionsRepository findAll():');
            throw new Error(`Erro ao buscar todas as transações: ${error}`);

        }

    }

    public findById(id: number): Promise<Transactions | null> {
        return this.transactionsRepository.findOneBy({ id });
    }

    public findByCategoryOnGroup(category_id: number, user_id: number): Promise<TransactionsCategories[]> {
        return this.transactionsRepository.createQueryBuilder('transaction')
            .select(['transaction', 'category.type', 'category.name'])
            .innerJoinAndSelect(Categories, 'category', "transaction.category_id = category.id")
            .where('transactions.user_id = :user_id', { user_id })
            .groupBy('category.id')
            .getRawMany();
    }

    public findByTypeOnGroup(type: string, user_id: number): Promise<TransactionsCategories[]> {
        return this.transactionsRepository.createQueryBuilder('transaction')
            .select(['transaction','category.type','category.name'])
            .innerJoinAndSelect(Categories, 'category', "transaction.category_id = category.id")
            .where('transactions.user_id = :user_id', { user_id })
            .groupBy('category.type')
            .getRawMany();
    }

    public async create(transaction: Partial<Transactions>): Promise<Transactions> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdTransaction = queryRunner.manager.create(Transactions, transaction);
            const savedTransaction = await queryRunner.manager.save(createdTransaction);

            if (transaction.category_id && transaction.value && transaction.user_id) {
                let typeOfTransaction = await this.categoryRepository.findById(transaction.category_id);
                if (typeOfTransaction && typeOfTransaction.type == 'entrada')
                    await this.usersRepository.updateDebit(transaction.value, transaction.user_id);
                else {
                    await this.usersRepository.updateDebit(transaction.value * -1, transaction.user_id);
                }
            }
            else {
                await queryRunner.rollbackTransaction();
                throw new Error('Parâmetros inválidos');
            }
            await queryRunner.commitTransaction();
            return savedTransaction;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Erro em TransactionsRepository create():', error);
            throw new Error(`Erro ao criar a transação: ${error}`);
        }
    }


}

export default TransactionsRepository;