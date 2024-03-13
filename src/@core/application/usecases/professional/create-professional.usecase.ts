import { Professional } from '../../../domain/entities/professional.entity';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { Email } from '../../../domain/value-objects/email.value-object';
import { Phone } from '../../../domain/value-objects/phone.value-object';
import {
  TInputProfessionalDTO,
  TOutputProfessionalDTO,
} from '../../dto/professional.dto';
import { mapOutput } from './util';

export class CreateProfessionalUsecase {
  constructor(
    private readonly professionalRepository: IProfessionalRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(props: TInputProfessionalDTO): Promise<TOutputProfessionalDTO> {
    const validated = this.validator.validate(this.schema, props);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }

    const phone = Phone.create(props.phone);
    const email = Email.create(props.email);
    const categories = await Promise.all(
      props.categories_id.map(
        async (category) => await this.categoryRepository.findById(category),
      ),
    );
    const professional = Professional.create({
      ...props,
      phone,
      email,
      categories,
    });
    const result = await this.professionalRepository.create(professional);
    return mapOutput(result);
  }
}
