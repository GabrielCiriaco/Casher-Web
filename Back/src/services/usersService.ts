import UsersRepository from '../repositories/UsersRepository';
import { Users } from '../entities/Users';
import * as bcrypt from 'bcrypt';

class UsersService {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public async createUser(user: Partial<Users>): Promise<Users> {
        try {
            
            return this.usersRepository.create(user);
        }
        catch (error) {
            console.error('Erro em UsersService createUser():', error);
            throw new Error(`Erro ao criar o usuário: ${error}`);
        }
    }

    public async updateUser(user: Partial<Users>): Promise<Users | null> {
        return this.usersRepository.update(user);
    }

    public async deleteUser(id: number): Promise<boolean> {
        return this.usersRepository.delete(id);
    }

    public async getUserById(id: number): Promise<Users | null> {
        return this.usersRepository.findById(id);
    }
    
    public async getAllUsers(): Promise<Users[]> {
        try {
            return this.usersRepository.findAll();
        }
        catch (error) {
            console.error('Erro em UsersService getAllUsers():', error);
            throw new Error(`Erro ao buscar todos os usuários: ${error}`);
        }
    }

   

    
}

export default UsersService;
