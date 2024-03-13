import { IValidation } from '../../../domain/interfaces/validation.interface';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputCategoryDTO, TOutputCategoryDTO } from '../../dto/category.dto';

export class UpdateCategoryUsecase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(
    id: number,
    input: TInputCategoryDTO,
  ): Promise<TOutputCategoryDTO> {
    const validation = this.validator.validate(this.schema, input);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errorsResult);
    }
    const categoryExists = await this.categoryRepository.findById(id);
    if (!categoryExists) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }
    categoryExists.setName(input.name);

    const result = await this.categoryRepository.update(categoryExists);
    return result.toJSON();
  }
}
