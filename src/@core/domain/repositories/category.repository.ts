import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
}
