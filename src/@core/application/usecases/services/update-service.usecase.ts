import { NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { TInputServicesDTO, TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';

export class UpdateServiceUsecase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    data: TInputServicesDTO,
    id: number,
  ): Promise<TOutputServicesDTO> {
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
