import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
import { TOutputProfessionalDTO } from '../../dto/professional.dto';
import { mapOutput } from './util';

export class FindProfessionalByIdUsecase {
  constructor(
    private readonly professionalRepository: IProfessionalRepository,
  ) {}

  async execute(id: number): Promise<TOutputProfessionalDTO> {
    const result = await this.professionalRepository.findById(id);
    return mapOutput(result);
  }
}
