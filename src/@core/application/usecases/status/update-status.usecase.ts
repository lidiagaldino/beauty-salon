import { Status } from '../../../domain/entities/status.entity';
import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputStatusDTO, TOutputStatusDTO } from '../../dto/status.dto';

export class UpdateStatusUsecase {
  constructor(private readonly statusRepository: IStatusRepository) {}

  async execute(id: number, input: TInputStatusDTO): Promise<TOutputStatusDTO> {
    const statusExists = await this.statusRepository.findById(id);

    if (!statusExists) {
      throw new NotFoundException('STATUS_NOT_FOUND');
    }
    const status = Status.create({ ...input });
    status.setId(id);

    const updatedStatus = await this.statusRepository.update(status);

    return updatedStatus.toJSON();
  }
}
