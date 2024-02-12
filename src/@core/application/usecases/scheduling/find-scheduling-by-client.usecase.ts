import { IClientRepository } from '../../../domain/repositories/client.repository';
import { ISchedulingRepository } from '../../../domain/repositories/scheduling.repository';
import { TOutputSchedulingDTO } from '../../dto/scheduling.dto';
import { mapOutput } from './util';

export class FindSchedulingByClient {
  constructor(
    private readonly schedulingRepository: ISchedulingRepository,
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(clientId: number): Promise<TOutputSchedulingDTO[]> {
    const client = await this.clientRepository.findById(clientId);
    const schedules = await this.schedulingRepository.findByClient(client);
    return schedules.map(mapOutput);
  }
}
