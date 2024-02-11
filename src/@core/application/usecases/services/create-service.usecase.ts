import { Service } from '../../../domain/entities/services.entity';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputServicesDTO, TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';

export class CreateServiceUseCase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: TInputServicesDTO): Promise<TOutputServicesDTO> {
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
