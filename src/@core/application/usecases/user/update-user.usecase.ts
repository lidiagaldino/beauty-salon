import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputUserDTO, TOutputUserDTO } from '../../dto/user.dto';

export class UpdateUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: number,
    input: Pick<TInputUserDTO, 'name'>,
  ): Promise<TOutputUserDTO> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    userExists.setName(input.name);

    const userUpdated = await this.userRepository.update(userExists);

    return userUpdated.toJSONWithoutPassword();
  }
}
