import { Category } from '../../../domain/entities/category.entity';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputCategoryDTO, TOutputCategoryDTO } from '../../dto/category.dto';

export class UpdateCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    id: number,
    input: Partial<TInputCategoryDTO>,
  ): Promise<TOutputCategoryDTO> {
    const categoryExists = await this.categoryRepository.findById(id);
    if (!categoryExists) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }
    const updateCategory = { ...categoryExists.toJSON(), ...input };
    const category = Category.create(updateCategory);
    category.setId(categoryExists.getId());
    const result = await this.categoryRepository.update(category);
    return result.toJSON();
  }
}
