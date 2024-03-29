import { IValidation } from '../../../domain/interfaces/validation.interface';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { Email } from '../../../domain/value-objects/email.value-object';
import { Phone } from '../../../domain/value-objects/phone.value-object';
import {
  TInputProfessionalDTO,
  TOutputProfessionalDTO,
} from '../../dto/professional.dto';
import { mapOutput } from './util';

export class UpdateProfessionalUsecase {
  constructor(
    private readonly professionalRepository: IProfessionalRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(
    id: number,
    props: TInputProfessionalDTO,
  ): Promise<TOutputProfessionalDTO> {
    const validated = this.validator.validate(this.schema, props);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }

    const professionalExists = await this.professionalRepository.findById(id);
    if (!professionalExists) {
      throw new NotFoundException('PROFESSIONAL_NOT_FOUND');
    }

    const phone = Phone.create(props.phone);
    professionalExists.setPhone(phone);

    const email = Email.create(props.email);
    professionalExists.setEmail(email);

    const categories = await Promise.all(
      props.categories_id.map(
        async (category) => await this.categoryRepository.findById(category),
      ),
    );
    professionalExists.setCategories(categories);

    professionalExists.setBio(props.bio);
    professionalExists.setName(props.name);

    const result = await this.professionalRepository.update(professionalExists);
    return mapOutput(result);
  }
}
