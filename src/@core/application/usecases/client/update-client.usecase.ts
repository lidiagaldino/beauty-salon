import { Client } from '../../../domain/entities/client.entity';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { Phone } from '../../../domain/value-objects/phone.value-object';
import { TInputClientDTO, TOutputClientDTO } from '../../dto/client.dto';
import { mapOutput } from './util';

export class UpdateClientUsecase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(
    id: number,
    input: Partial<Pick<TInputClientDTO, 'name' | 'phone'>>,
  ): Promise<TOutputClientDTO> {
    const clientExists = await this.clientRepository.findById(id);
    if (!clientExists) {
      throw new NotFoundException('CLIENT_NOT_FOUND');
    }
    if (input.phone) {
      clientExists.setPhone(Phone.create(input.phone));
      delete input.phone;
    }
    const updateClient = {
      ...input,
      ...clientExists.toJSONWithoutPassword(),
    };
    const client = Client.create(updateClient);
    client.setId(clientExists.getId());
    const result = await this.clientRepository.update(client);
    return mapOutput(result);
  }
}
