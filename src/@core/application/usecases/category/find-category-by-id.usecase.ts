import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { TOutputCategoryDTO } from '../../dto/category.dto';

export class FindCategoryByIdUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<TOutputCategoryDTO> {
    const category = await this.categoryRepository.findById(id);
    return category.toJSON();
  }
}
