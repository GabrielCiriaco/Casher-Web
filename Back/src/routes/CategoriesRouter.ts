import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const categoriesController = new CategoriesController();

router.post('/createCategory', authMiddleware, categoriesController.createCategory.bind(categoriesController));
router.get('/getAllCategories', authMiddleware, categoriesController.getAllCategories.bind(categoriesController));
router.put('/updateCategory', authMiddleware, categoriesController.updateCategory.bind(categoriesController));
router.put('/enableCategory', authMiddleware, categoriesController.enableCategory.bind(categoriesController));
router.delete('/disableCategory', authMiddleware, categoriesController.disableCategory.bind(categoriesController));

export default router;