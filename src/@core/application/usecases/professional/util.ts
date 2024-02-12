import { Professional } from '../../../domain/entities/professional.entity';
import { TOutputProfessionalDTO } from '../../dto/professional.dto';

export function mapOutput(input: Professional): TOutputProfessionalDTO {
  return {
    id: input.getId(),
    name: input.getName(),
    phone: input.getPhone().toJSON(),
    email: input.getEmail().toJSON(),
    categories_id: input.getCategories().map((category) => category.getId()),
    bio: input.getBio(),
  };
}
