import UsersRepository from '../repositories/UsersRepository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from '../entities/Users';

class AuthService {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public async login(email: string, password: string): Promise<string | null> {
        const user = await this.usersRepository.findUserByEmail(email);

        if (user) {
            const compare = await bcrypt.compare(password, user.password); // Compara a senha fornecida com o hash armazenado
            if (compare) {
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
                return token;
            }
        }
        return null;
    }
}

export default AuthService;
