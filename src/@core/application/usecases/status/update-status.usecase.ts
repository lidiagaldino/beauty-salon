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
    statusExists.setName(input.name);

    const updatedStatus = await this.statusRepository.update(statusExists);

    return updatedStatus.toJSON();
  }
}
