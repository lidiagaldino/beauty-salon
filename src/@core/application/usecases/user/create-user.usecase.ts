import { User } from '../../../domain/entities/user.entity';
import { IPasswordCryptography } from '../../../domain/interfaces/password.criptography.interface';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { TInputUserDTO, TOutputUserDTO } from '../../dto/user.dto';

export class CreateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordCryptography: IPasswordCryptography,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(input: TInputUserDTO): Promise<TOutputUserDTO> {
    const validated = this.validator.validate(this.schema, input);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
    const password = await this.passwordCryptography.hash(input.password);
    const user = User.create({ ...input, password });
    const result = await this.userRepository.create(user);
    return result.toJSONWithoutPassword();
  }
}
