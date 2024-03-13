import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputCategoryDTO } from '../../dto/category.dto';

export class FindCategoryByIdUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<TOutputCategoryDTO> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('CATEGORY_NOT_FOUND');
    return category.toJSON();
  }
}
