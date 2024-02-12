import { Professional } from '../../../domain/entities/professional.entity';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
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
  ) {}

  async execute(props: TInputProfessionalDTO): Promise<TOutputProfessionalDTO> {
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
