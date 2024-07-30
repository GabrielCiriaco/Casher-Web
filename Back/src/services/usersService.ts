import UsersRepository from '../repositories/UsersRepository';
import { Users } from '../entities/Users';
import * as bcrypt from 'bcrypt';

class UsersService {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public async createUser(name: string, email: string, password: string): Promise<Users> {
        
        const user = this.usersRepository.createUser({
            name,
            email,
            password: password,
        });
        return this.usersRepository.saveUser(user);
    }

    public async getAllUsers(): Promise<Users[]> {
        return this.usersRepository.findAllUsers();
    }

    public async getUserById(id: number): Promise<Users | null> {
        return this.usersRepository.findUserById(id);
    }

    public async updateUser(id: number, username?: string, email?: string, password?: string): Promise<Users | null> {
        const userUpdates: Partial<Users> = {};
        if (username) userUpdates.name = username;
        if (email) userUpdates.email = email;
        if (password) userUpdates.password = await bcrypt.hash(password, 10);

        return this.usersRepository.updateUser(id, userUpdates);
    }

    public async deleteUser(id: number): Promise<boolean> {
        return this.usersRepository.deleteUser(id);
    }
}

export default UsersService;
