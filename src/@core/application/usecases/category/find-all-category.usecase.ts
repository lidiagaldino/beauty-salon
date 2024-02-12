import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { TOutputCategoryDTO } from '../../dto/category.dto';

export class FindAllCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(): Promise<TOutputCategoryDTO[]> {
    const result = await this.categoryRepository.findAll();
    return result.map((item) => item.toJSON());
  }
}
