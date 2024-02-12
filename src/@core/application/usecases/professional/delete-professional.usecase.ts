import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';

export class DeleteProfessionalUsecase {
  constructor(
    private readonly professionalRepository: IProfessionalRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.professionalRepository.delete(id);
  }
}
