import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';

export class FindServiceByIdUsecase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(id: number): Promise<TOutputServicesDTO> {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException('SERVICE_NOT_FOUND');
    }
    return mapOutput(service);
  }
}
