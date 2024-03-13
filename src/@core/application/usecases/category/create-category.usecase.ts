import { Category } from '../../../domain/entities/category.entity';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { TInputCategoryDTO, TOutputCategoryDTO } from '../../dto/category.dto';

export class CreateCategoryUsecase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(input: TInputCategoryDTO): Promise<TOutputCategoryDTO> {
    const validation = this.validator.validate(this.schema, input);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errorsResult);
    }
    const category = Category.create(input);
    const categoryCreated = await this.categoryRepository.create(category);
    return categoryCreated.toJSON();
  }
}
