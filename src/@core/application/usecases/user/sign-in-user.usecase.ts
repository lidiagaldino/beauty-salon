import { IPasswordCryptography } from '../../../domain/interfaces/password.criptography.interface';
import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { UnauthorizedError } from '../../../domain/shared/errors/unauthorized.exception';
import { TInputLogin, TOutputLogin } from '../../dto/login.dto';
import { TOutputUserDTO } from '../../dto/user.dto';

export class SignInUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userCriptography: IUserCryptography,
    private readonly passwordCryptography: IPasswordCryptography,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(input: TInputLogin): Promise<TOutputLogin<TOutputUserDTO>> {
    const validated = this.validator.validate(this.schema, input);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
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
