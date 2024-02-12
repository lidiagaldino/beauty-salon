import { ISchedulingRepository } from '../../../domain/repositories/scheduling.repository';
import { TOutputSchedulingDTO } from '../../dto/scheduling.dto';
import { mapOutput } from './util';

export class FindAllSchedulingUsecase {
  constructor(private readonly schedulingRepository: ISchedulingRepository) {}

  async execute(): Promise<TOutputSchedulingDTO[]> {
    const schedules = await this.schedulingRepository.findAll();
    return schedules.map(mapOutput);
  }
}
