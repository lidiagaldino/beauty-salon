import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputUserDTO } from '../../dto/user.dto';

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<TOutputUserDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    return user.toJSONWithoutPassword();
  }
}
