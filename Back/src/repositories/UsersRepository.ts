import { DataSource, Repository } from 'typeorm';
import { Users} from '../entities/Users';
import Database from '../config/database';

class UsersRepository {
    private dataSource: DataSource;
    private userRepository: Repository<Users>;

    constructor() {
        this.dataSource = Database.getInstance();
        this.userRepository = this.dataSource.getRepository(Users);
    }

    public findAll(): Promise<Users[]> {
        try {
            return this.userRepository.find();
        }
        catch (error) {
            console.error('Erro em UserRepository findAll():', error);
            throw new Error(`Erro ao buscar todos os usuários: ${error}`);
        }
    }

    public findById(id: number): Promise<Users | null> {
        try {
            console.log('ta tentando por id:', id);
            return this.userRepository.findOneBy({ id });
        }
        catch (error) {
            console.error('Erro em UserRepository findById():', error);
            throw new Error(`Erro ao buscar o usuário por ID: ${error}`);
        }
    }

    public findByEmail(email: string): Promise<Users | null> {
        try {
            return this.userRepository.findOneBy({ email });
        }
        catch (error) {
            console.error('Erro em UserRepository findByEmail():', error);
            throw new Error(`Erro ao buscar o usuário por email: ${error}`);
        }
    }

    public create(user: Partial<Users>): Promise<Users> {
        try {
            const createdUser = this.userRepository.create(user);
            return this.userRepository.save(createdUser);
        }
        catch (error) {
            console.error('Erro em UserRepository create():', error);
            throw new Error(`Erro ao criar o usuário: ${error}`);
        }
    }

    public async delete(id:number): Promise<boolean> {
        const user: Users| null = await this.findById(id);
        if (!user) {
            return false;
        }
        const result = await this.userRepository.delete(user.id);
        return result.affected ? true : false;
    }

    public async update(user: Partial<Users>): Promise<Users> {
        if (!user.id) {
            throw new Error(`Parametros Invalidos: ${user}`);
        }

        try {
            const existingUser: Users | null = await this.findById(user.id);

            if (!existingUser) {
                throw new Error(`Parametros Invalidos: ${user}`);
            }
            const finalUser: Users = this.userRepository.merge(existingUser, user);
            return await this.userRepository.save(finalUser);
        }
        catch (error) {
            console.error('Erro em UserRepository update():', error);
            throw new Error(`Erro ao atualizar o usuário: ${error}`);
        }
    }

    public async updateDebit(transaction: number, user_id:number): Promise<Users> {
        if (!transaction) {
            throw new Error(`Parametros Invalidos: ${transaction}`);
        }

        try {
            const existingUser: Users | null = await this.findById(user_id);

            if (!existingUser) {
                throw new Error(`Usuário não encontrado: ${user_id}`);
            }
            existingUser.debit += transaction;
            return await this.userRepository.save(existingUser);
        }
        catch (error) {
            console.error('Erro em UserRepository updateDebit():', error);
            throw new Error(`Erro ao atualizar o usuário: ${error}`);
        }
    }

}

export default UsersRepository;
