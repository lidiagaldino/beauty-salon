import { NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { TInputServicesDTO, TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';
import { Service } from '../../../domain/entities/services.entity';

export class UpdateServiceUsecase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    data: Partial<TInputServicesDTO>,
    id: number,
  ): Promise<TOutputServicesDTO> {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException('SERVICE_NOT_FOUND');
    }
    if (data.category_id) {
      const category = await this.categoryRepository.findById(data.category_id);
      if (!category) {
        throw new NotFoundException('CATEGORY_NOT_FOUND');
      }
      service.setCategory(category);
      delete data.category_id;
    }

    const updateService = Service.create({ ...service.toJSON(), ...data });
    const result = await this.serviceRepository.update(updateService);
    return mapOutput(result);
  }
}
