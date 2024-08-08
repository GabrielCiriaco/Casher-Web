import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const usersController = new UsersController();


router.post('/createUser',  usersController.createUser.bind(usersController));

router.get('/users', authMiddleware, usersController.getAllUsers.bind(usersController));

router.get('/users/:id', authMiddleware, usersController.getUserById.bind(usersController));

router.put('/users/:id', authMiddleware, usersController.updateUser.bind(usersController));

router.delete('/users/:id', authMiddleware, usersController.deleteUser.bind(usersController));

export default router;
