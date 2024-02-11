import { IClientRepository } from '../../../domain/repositories/client.repository';
import { TOutputClientDTO } from '../../dto/client.dto';
import { mapOutput } from './util';

export class FindAllClientUsecase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(): Promise<TOutputClientDTO[]> {
    const clients = await this.clientRepository.findAll();
    return clients.map(mapOutput);
  }
}
