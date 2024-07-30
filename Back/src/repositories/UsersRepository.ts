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

    public createUser(user: Partial<Users>): Users {
        return this.userRepository.create(user);
    }

    public saveUser(user: Users): Promise<Users> {
        return this.userRepository.save(user);
    }

    public findAllUsers(): Promise<Users[]> {
        return this.userRepository.find();
    }

    public findUserById(id: number): Promise<Users | null> {
        return this.userRepository.findOneBy({ id });
    }

    public findUserByEmail(email: string): Promise<Users | null> {
        return this.userRepository.findOneBy({ email });
    }

    public async updateUser(id: number, user: Partial<Users>): Promise<Users| null> {
        const existingUser = await this.userRepository.findOneBy({ id });
        if (existingUser) {
            this.userRepository.merge(existingUser, user);
            return this.userRepository.save(existingUser);
        }
        return null;
    }

    public async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected ? true : false;
    }
}

export default UsersRepository;
