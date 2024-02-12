import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
import { TOutputProfessionalDTO } from '../../dto/professional.dto';
import { mapOutput } from './util';

export class FindAllProfessionalUsecase {
  constructor(
    private readonly professionalRepository: IProfessionalRepository,
  ) {}

  async execute(): Promise<TOutputProfessionalDTO[]> {
    const result = await this.professionalRepository.findAll();
    return result.map(mapOutput);
  }
}
