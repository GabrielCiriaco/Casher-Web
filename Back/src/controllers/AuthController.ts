import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
           
            const token = await this.authService.login(email, password);
            if (token) {
                return res.status(200).json({ token });
            }
            return res.status(401).json({ message: 'Invalid credentials' });
        } catch (error) {
            console.error('Error on login:');
            return res.status(500).json({ message: 'Não existe esse usuário' });
        }
    }
}   

export default AuthController;
