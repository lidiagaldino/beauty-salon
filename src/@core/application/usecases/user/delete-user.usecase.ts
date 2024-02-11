import { IUserRepository } from '../../../domain/repositories/user.repository';

export class DeleteUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
