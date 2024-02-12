import { ISchedulingRepository } from '../../../domain/repositories/scheduling.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';

export class DeleteSchedulingUsecase {
  constructor(private readonly schedulingRepository: ISchedulingRepository) {}

  async execute(id: number): Promise<void> {
    const scheduling = await this.schedulingRepository.findById(id);
    if (!scheduling) {
      throw new NotFoundException('SCHEDULING_NOT_FOUND');
    }
    await this.schedulingRepository.delete(id);
  }
}
