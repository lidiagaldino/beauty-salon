import { User } from '../../../domain/entities/user.entity';
import { IPasswordCryptography } from '../../../domain/interfaces/password.criptography.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { TInputUserDTO, TOutputUserDTO } from '../../dto/user.dto';

export class CreateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordCryptography: IPasswordCryptography,
  ) {}

  async execute(input: TInputUserDTO): Promise<TOutputUserDTO> {
    const password = await this.passwordCryptography.hash(input.password);
    const user = User.create({ ...input, password });
    const result = await this.userRepository.create(user);
    return result.toJSONWithoutPassword();
  }
}
