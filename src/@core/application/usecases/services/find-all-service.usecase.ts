import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { TOutputServicesDTO } from '../../dto/services.dto';
import { mapOutput } from './util';

export class FindAllServiceUsecase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(): Promise<TOutputServicesDTO[]> {
    const services = await this.serviceRepository.findAll();
    return services.map(mapOutput);
  }
}
