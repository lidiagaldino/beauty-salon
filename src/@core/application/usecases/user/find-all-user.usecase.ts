import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputUserDTO } from '../../dto/user.dto';

export class FindAllUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<TOutputUserDTO[]> {
    const users = await this.userRepository.findAll();
    if (users.length === 0) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return users.map((user) => user.toJSONWithoutPassword());
  }
}
