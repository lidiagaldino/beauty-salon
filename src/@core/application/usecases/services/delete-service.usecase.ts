import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';

export class DeleteServiceUsecase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(id: number): Promise<void> {
    const service = await this.serviceRepository.findById(id);
    if (!service) throw new NotFoundException('SERVICE_NOT_FOUND');
    await this.serviceRepository.delete(id);
  }
}
