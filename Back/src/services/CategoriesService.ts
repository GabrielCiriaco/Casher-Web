import CategoriesRepository from '../repositories/CategoriesRepository';
import { Categories } from '../entities/Categories';
import * as bcrypt from 'bcrypt';

class CategoriesService{
    private categoriesRepository: CategoriesRepository;

    constructor() {
        this.categoriesRepository = new CategoriesRepository();
    }

    public async createCategory(category: Partial<Categories>): Promise<Categories> {
        try {
            return this.categoriesRepository.create(category);
        } catch (error) {
            console.error('Erro em CategoriesRepository createCategory()');
            throw new Error(`Erro ao criar Categoria: ${error}`);
        }
    }

    public async getAllCategories(user_id: number): Promise<Categories[]> {
        try {
            return this.categoriesRepository.findAll(user_id);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error(`Erro ao buscar todas as categorias: ${error}`);
        }
    }

    public async disableCategory(id: number): Promise<Categories | null> {
        try {
            return this.categoriesRepository.disable(id);
        }catch(error){
            console.error('Error fetching category:', error);
            throw new Error(`Erro ao desabilitar a categoria: ${error}`);
        }
    }


    public async enableCategory(id: number): Promise<Categories | null> {
        try {
            return this.categoriesRepository.enable(id);
        } catch (error) {
            console.error('Error fetching category:', error);
            throw new Error(`Erro ao habilitar a categoria: ${error}`);
        }
    }

    public async updateCategory(category: Partial<Categories>): Promise<Categories | null> {
        try {
            return this.categoriesRepository.update(category);
        } catch (error) {
            console.error('Error fetching category:', error);
            throw new Error(`Erro ao atualizar a categoria: ${error}`);
        }
    }

}

export default CategoriesService;
