import { IPasswordCryptography } from '../../../domain/interfaces/password.criptography.interface';
import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { UnauthorizedError } from '../../../domain/shared/errors/unauthorized.exception';
import { TInputUserDTO, TOutputLogin } from '../../dto/user.dto';

export class SignInUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userCriptography: IUserCryptography,
    private readonly passwordCryptography: IPasswordCryptography,
  ) {}

  async execute(input: TInputUserDTO): Promise<TOutputLogin> {
    const user = await this.userRepository.findByLogin(input.login);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const passwordIsValid = await this.passwordCryptography.compare(
      input.password,
      user.toJSON()?.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedError();
    }

    const token = this.userCriptography.encrypt({
      id: user.toJSON().id,
      name: user.toJSON().name,
      type: 'ADMIN',
    });

    return { token, user: user.toJSONWithoutPassword() };
  }
}
