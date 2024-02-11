import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { TOutputStatusDTO } from '../../dto/status.dto';

export class FindAllStatusUsecase {
  constructor(private readonly statusRepository: IStatusRepository) {}

  async execute(): Promise<TOutputStatusDTO[]> {
    const result = await this.statusRepository.findAll();
    return result.map((status) => status.toJSON());
  }
}
