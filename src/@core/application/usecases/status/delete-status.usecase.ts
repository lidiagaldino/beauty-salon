import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';

export class DeleteStatusUsecase {
  constructor(private readonly statusRepository: IStatusRepository) {}

  async execute(id: number): Promise<void> {
    const status = await this.statusRepository.findById(id);
    if (!status) throw new NotFoundException('STATUS_NOT_FOUND');
    await this.statusRepository.delete(id);
  }
}
