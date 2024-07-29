import Database from '../config/database';
import { Users } from '../entities/users';
import * as bcrypt from 'bcrypt';

class UsersService {
    private userRepository = Database.getInstance().getRepository(Users);

    public async createUser(username: string, email: string, password: string): Promise<Users> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            email,
            password: hashedPassword
        });
        return this.userRepository.save(user);
    }

    public async getAllUsers(): Promise<Users[]> {
        return this.userRepository.find();
    }

    public async getUserById(id: number): Promise<Users | null> {
        return this.userRepository.findOneBy({ id });
    }

    public async updateUser(id: number, username?: string, email?: string, password?: string): Promise<Users | null> {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 10);
            return this.userRepository.save(user);
        }
        return null;
    }

    public async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected ? true : false;
    }
}

export default UsersService;
