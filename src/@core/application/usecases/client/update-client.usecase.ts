import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { Phone } from '../../../domain/value-objects/phone.value-object';
import { TInputUpdateClientDTO, TOutputClientDTO } from '../../dto/client.dto';
import { mapOutput } from './util';

export class UpdateClientUsecase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(
    id: number,
    input: TInputUpdateClientDTO,
  ): Promise<TOutputClientDTO> {
    const validated = this.validator.validate(this.schema, input);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }

    const clientExists = await this.clientRepository.findById(id);
    if (!clientExists) {
      throw new NotFoundException('CLIENT_NOT_FOUND');
    }
    clientExists.setPhone(Phone.create(input.phone));
    clientExists.setName(input.name);

    const result = await this.clientRepository.update(clientExists);
    return mapOutput(result);
  }
}
