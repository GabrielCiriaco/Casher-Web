import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);
        if (token) {
            return res.status(200).json({ token });
        }
        return res.status(401).json({ message: 'Invalid credentials' });
    }
}   

export default AuthController;
