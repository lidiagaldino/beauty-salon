import { Category } from '../entities/category.entity';
import { Service } from '../entities/services.entity';

export interface IServiceRepository {
  create(service: Service): Promise<Service>;
  findAll(): Promise<Service[]>;
  findById(id: number): Promise<Service>;
  update(service: Service): Promise<Service>;
  delete(id: number): Promise<void>;
  findByCategory(category: Category): Promise<Service[]>;
}
