import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const usersController = new CategoriesController();

router.post('/createCategory', authMiddleware, usersController.createCategory.bind(usersController));
router.get('/getAllCategories', authMiddleware, usersController.getAllCategories.bind(usersController));
router.put('/updateCategory', authMiddleware, usersController.updateCategory.bind(usersController));
router.delete('/disableCategory', authMiddleware, usersController.disableCategory.bind(usersController));

export default router;