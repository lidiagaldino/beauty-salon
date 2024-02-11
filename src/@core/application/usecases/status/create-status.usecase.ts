import { Status } from '../../../domain/entities/status.entity';
import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { TInputStatusDTO, TOutputStatusDTO } from '../../dto/status.dto';

export class CreateStatusUsecase {
  constructor(private readonly statusRepository: IStatusRepository) {}

  async execute(data: TInputStatusDTO): Promise<TOutputStatusDTO> {
    const status = Status.create(data);
    const result = await this.statusRepository.create(status);
    return result.toJSON();
  }
}
