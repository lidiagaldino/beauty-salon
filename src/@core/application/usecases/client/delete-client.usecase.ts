import { IClientRepository } from '../../../domain/repositories/client.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';

export class DeleteClientUsecase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: number): Promise<void> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('CLIENT_NOT_FOUND');
    }
    await this.clientRepository.delete(id);
  }
}
