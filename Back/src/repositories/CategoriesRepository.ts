import { DataSource, Repository } from 'typeorm';
import { Categories } from '../entities/Categories';
import Database from '../config/database';

class CategoriesRepository {
    private dataSource: DataSource;
    private categoryRepository: Repository<Categories>;

    constructor() {
        this.dataSource = Database.getInstance();
        this.categoryRepository = this.dataSource.getRepository(Categories);
    }
    public findAll(user_id: number): Promise<Categories[]> {
        try {
            
            return this.categoryRepository.find({ where: { user_id } });
        } catch (error) {
            console.error('Erro em CategoriesRepository findAll():');
            throw new Error(`Erro ao buscar todas as categorias: ${error}`);
        }
    }

    private findByName(name: string): Promise<Categories | null> {
        return this.categoryRepository.findOneBy({ name });
    }

    private findById(id: number): Promise<Categories | null> {
        return this.categoryRepository.findOneBy({ id });
    }

    private findByNameAndUserId(name:string, user_id:number): Promise<Categories | null> {
        return this.categoryRepository.findOneBy({ name, user_id, status: true });
    }


    public async create(category: Partial<Categories>): Promise<Categories> {
        try {
            if (!category.name || !category.user_id) {
                throw new Error('Parâmetros Invalidos');
            }

            const categoryFound: Categories | null = await this.findByNameAndUserId(category.name, category.user_id)

            if (categoryFound) {
                throw new Error('Categoria já existe');
            }

            const newCategory: Categories = this.categoryRepository.create(category);
            return this.categoryRepository.save(newCategory);
        }catch(error){
            console.error('Erro em CategoriesRepository create():');
            throw new Error(`Erro ao criar Categoria: ${error}`);
        }
        
    }

    public async update(category: Partial<Categories>): Promise<Categories | null> {
        if (!category.id) {
            return null;
        }

        const existingCategory = await this.findById(category.id);

        if (!existingCategory) {
            return null;
        }
        
        existingCategory.name = category.name || existingCategory.name;
        return await this.categoryRepository.save(category);
    }
    
    public async disable(id: number): Promise<Categories | null> {
        const category: Categories | null = await this.findById(id);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        // Atualiza o status e salva
        category.status = false;
        
        return await this.categoryRepository.save(category);

    }


    
    
}

export default CategoriesRepository;