import { IPasswordCryptography } from '../../../domain/interfaces/password.criptography.interface';
import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { UnauthorizedError } from '../../../domain/shared/errors/unauthorized.exception';
import { TOutputClientDTO } from '../../dto/client.dto';
import { TInputLogin, TOutputLogin } from '../../dto/login.dto';

export class SignInClientUsecase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly userCryptography: IUserCryptography,
    private readonly passwordCryptography: IPasswordCryptography,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(input: TInputLogin): Promise<TOutputLogin<TOutputClientDTO>> {
    const client = await this.clientRepository.findByLogin(input.login);
    if (!client) {
      throw new NotFoundException('CLIENT_NOT_FOUND');
    }

    const passwordIsValid = await this.passwordCryptography.compare(
      input.password,
      client.getPassword(),
    );
    if (!passwordIsValid) {
      throw new UnauthorizedError();
    }

    const token = this.userCryptography.encrypt({
      id: client.getId(),
      name: client.getName(),
      type: 'CLIENT',
    });
    return {
      token,
      user: client.toJSONWithoutPassword(),
    };
  }
}
