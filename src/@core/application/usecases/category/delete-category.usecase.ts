import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';

export class DeleteCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<void> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }
    await this.categoryRepository.delete(id);
    return;
  }
}
