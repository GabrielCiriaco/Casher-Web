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
        try {
            console.log('email:', email);
            console.log('password:', password);
            const user = await this.usersRepository.findByEmail(email);
            console.log('user:', user);
            if (user) {
                const compare = await bcrypt.compare(password, user.password); // Compara a senha fornecida com o hash armazenado
                if (compare) {
                    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
                    return token;
                }
            }
            return null;
        }
        catch (error) {
            console.error('Error AuthService login:');
            throw new Error(`Error on login: ${error}`);
        }
    }
}

export default AuthService;
