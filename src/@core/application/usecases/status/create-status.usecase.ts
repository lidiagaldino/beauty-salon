import { Status } from '../../../domain/entities/status.entity';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { TInputStatusDTO, TOutputStatusDTO } from '../../dto/status.dto';

export class CreateStatusUsecase {
  constructor(
    private readonly statusRepository: IStatusRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(data: TInputStatusDTO): Promise<TOutputStatusDTO> {
    const validated = this.validator.validate(this.schema, data);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
    const status = Status.create(data);
    const result = await this.statusRepository.create(status);
    return result.toJSON();
  }
}
