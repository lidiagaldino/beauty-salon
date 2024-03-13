import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputStatusDTO, TOutputStatusDTO } from '../../dto/status.dto';

export class UpdateStatusUsecase {
  constructor(
    private readonly statusRepository: IStatusRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(id: number, input: TInputStatusDTO): Promise<TOutputStatusDTO> {
    const validated = this.validator.validate(this.schema, input);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
    const statusExists = await this.statusRepository.findById(id);

    if (!statusExists) {
      throw new NotFoundException('STATUS_NOT_FOUND');
    }
    statusExists.setName(input.name);

    const updatedStatus = await this.statusRepository.update(statusExists);

    return updatedStatus.toJSON();
  }
}
