import { IClientRepository } from '../../../domain/repositories/client.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { Phone } from '../../../domain/value-objects/phone.value-object';
import { TInputClientDTO, TOutputClientDTO } from '../../dto/client.dto';
import { mapOutput } from './util';

export class UpdateClientUsecase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(
    id: number,
    input: Pick<TInputClientDTO, 'name' | 'phone'>,
  ): Promise<TOutputClientDTO> {
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
