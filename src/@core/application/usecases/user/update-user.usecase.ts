import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TInputUserDTO, TOutputUserDTO } from '../../dto/user.dto';

export class UpdateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(
    id: number,
    input: Pick<TInputUserDTO, 'name'>,
  ): Promise<TOutputUserDTO> {
    const validated = this.validator.validate(this.schema, input);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    userExists.setName(input.name);

    const userUpdated = await this.userRepository.update(userExists);

    return userUpdated.toJSONWithoutPassword();
  }
}
