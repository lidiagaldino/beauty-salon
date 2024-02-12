import { ISchedulingRepository } from '../../../domain/repositories/scheduling.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputSchedulingDTO } from '../../dto/scheduling.dto';
import { mapOutput } from './util';

export class FindSchedulingByIdUsecase {
  constructor(private readonly schedulingRepository: ISchedulingRepository) {}

  async execute(id: number): Promise<TOutputSchedulingDTO> {
    const scheduling = await this.schedulingRepository.findById(id);
    if (!scheduling) {
      throw new NotFoundException('SCHEDULING_NOT_FOUND');
    }
    return mapOutput(scheduling);
  }
}
