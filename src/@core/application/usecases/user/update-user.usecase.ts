import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputUserDTO, TOutputUserDTO } from '../../dto/user.dto';

export class UpdateUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: number,
    input: Partial<Omit<TInputUserDTO, 'password'>>,
  ): Promise<TOutputUserDTO> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const updatedUser = { ...input, ...userExists.toJSONWithoutPassword() };
    const user = User.create(updatedUser);
    user.setId(id);

    const userUpdated = await this.userRepository.update(user);

    return userUpdated.toJSONWithoutPassword();
  }
}
