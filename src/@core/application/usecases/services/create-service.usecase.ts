import { Service } from '../../../domain/entities/services.entity';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputServicesDTO, TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';

export class CreateServiceUseCase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(data: TInputServicesDTO): Promise<TOutputServicesDTO> {
    const validated = this.validator.validate(this.schema, data);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
    const category = await this.categoryRepository.findById(data.category_id);
    if (!category) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }
    const service = Service.create({
      name: data.name,
      price: data.price,
      duration: data.duration,
      category,
    });
    const result = await this.serviceRepository.create(service);
    return mapOutput(result);
  }
}
