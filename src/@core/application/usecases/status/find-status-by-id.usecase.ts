import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { TOutputStatusDTO } from '../../dto/status.dto';

export class FindStatusByIdUsecase {
  constructor(private readonly statusRepository: IStatusRepository) {}

  async execute(id: number): Promise<TOutputStatusDTO> {
    const result = await this.statusRepository.findById(id);
    return result.toJSON();
  }
}
