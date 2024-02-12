import { Category } from '../../../domain/entities/category.entity';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { TInputCategoryDTO, TOutputCategoryDTO } from '../../dto/category.dto';

export class CreateCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: TInputCategoryDTO): Promise<TOutputCategoryDTO> {
    const category = Category.create(input);
    const categoryCreated = await this.categoryRepository.create(category);
    return categoryCreated.toJSON();
  }
}
