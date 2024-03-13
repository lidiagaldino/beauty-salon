import { NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { TInputServicesDTO, TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';

export class UpdateServiceUsecase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(
    data: TInputServicesDTO,
    id: number,
  ): Promise<TOutputServicesDTO> {
    const validated = this.validator.validate(this.schema, data);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException('SERVICE_NOT_FOUND');
    }
    const category = await this.categoryRepository.findById(data.category_id);
    if (!category) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }
    service.setCategory(category);

    service.setName(data.name);
    service.setPrice(data.price);
    service.setDuration(data.duration);
    const result = await this.serviceRepository.update(service);
    return mapOutput(result);
  }
}
