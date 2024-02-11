import { IClientRepository } from '../../../domain/repositories/client.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputClientDTO } from '../../dto/client.dto';
import { mapOutput } from './util';

export class FindClientByIdUsecase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: number): Promise<TOutputClientDTO> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('CLIENT_NOT_FOUND');
    }
    return mapOutput(client);
  }
}
