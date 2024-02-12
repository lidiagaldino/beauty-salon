import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputCategoryDTO, TOutputCategoryDTO } from '../../dto/category.dto';

export class UpdateCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    id: number,
    input: TInputCategoryDTO,
  ): Promise<TOutputCategoryDTO> {
    const categoryExists = await this.categoryRepository.findById(id);
    if (!categoryExists) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }
    categoryExists.setDescription(input.description);
    categoryExists.setName(input.name);

    const result = await this.categoryRepository.update(categoryExists);
    return result.toJSON();
  }
}
