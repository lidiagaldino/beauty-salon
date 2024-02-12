import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
import { ISchedulingRepository } from '../../../domain/repositories/scheduling.repository';
import { TOutputSchedulingDTO } from '../../dto/scheduling.dto';
import { mapOutput } from './util';

export class FindSchedulingByProfessional {
  constructor(
    private readonly schedulingRepository: ISchedulingRepository,
    private readonly professionalRepository: IProfessionalRepository,
  ) {}

  async execute(professionalId: number): Promise<TOutputSchedulingDTO[]> {
    const professional =
      await this.professionalRepository.findById(professionalId);
    const schedules =
      await this.schedulingRepository.findByProfessional(professional);
    return schedules.map(mapOutput);
  }
}
