import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import { Users } from '../entities/Users';

class UsersController {
    private usersService = new UsersService();

    // Criar um novo usuário
    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            
            const user: Partial<Users> = {
                name,
                email,
                password,
            };

           await this.usersService.createUser(user);
            return res.status(201).json({ message: 'Usuário criado com Sucesso' });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Listar todos os usuários
    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.usersService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error UsersController getAllUsers:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obter um usuário por ID
    public async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            const id = req.body.user.id; 
            if (userId !== id) {
                return res.status(401).json({ message: 'Access denied' });
            }
            const user = await this.usersService.getUserById(userId);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Atualizar um usuário por ID
    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            const {name, email, password } = req.body;
            const user: Partial<Users> = {
                id: userId,
                name,
                email,
                password,
            };
            
            const updatedUser = await this.usersService.updateUser(user);
            if (updatedUser) {
                return res.status(200).json(updatedUser);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Deletar um usuário por ID
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            const result = await this.usersService.deleteUser(userId);
            if (result) {
                return res.status(204).json({ message: 'Usuário Deletado com sucesso' });
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default UsersController;
