import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputCategoryDTO } from '../../dto/category.dto';

export class FindAllCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(): Promise<TOutputCategoryDTO[]> {
    const result = await this.categoryRepository.findAll();
    if (!result) throw new NotFoundException('CATEGORY_NOT_FOUND');
    return result.map((item) => item.toJSON());
  }
}
