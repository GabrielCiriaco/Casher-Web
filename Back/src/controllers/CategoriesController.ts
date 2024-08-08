import { Request, Response } from 'express';
import CategoriesService from '../services/CategoriesService';
import { Categories } from '../entities/Categories';


class CategoriesControlller{
    private categoriesService = new CategoriesService();

    // Criar uma nova categoria
    public async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { name, type} = req.body;
            const user_id = req.body.user.id
            const category: Partial<Categories> = {
                name,
                type,
                user_id,
                status: true,
            };

            if (type !== 'entrada' && type !== 'saida') {
                res.status(400).json({ message: 'Invalid type' });
            }

            const newCategory = await this.categoriesService.createCategory(category);
            return res.status(201).json(newCategory);
        } catch (error) {
            console.error('Erro em CategoriesRepository createCategory()');
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getAllCategories(req: Request, res: Response): Promise<Response> {
        try {
            const user_id = req.body.user.id;
            const categories = await this.categoriesService.getAllCategories(user_id);
            return res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async disableCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { categoryId } = req.body;
            const category = await this.categoriesService.disableCategory(categoryId);
            if (category) {
                return res.status(200).json(category);
            } else {
                return res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            console.error('Error fetching category:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { categoryId, name } = req.body;
            const category: Partial<Categories> = {
                id: categoryId,
                name,
            };
            const updatedCategory = await this.categoriesService.updateCategory(category);
            if (updatedCategory) {
                return res.status(200).json(updatedCategory);
            } else {
                return res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            console.error('Error updating category:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default CategoriesControlller;