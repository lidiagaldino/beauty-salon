import * as yup from 'yup';
import { TInputProfessionalDTO } from '../../../../application/dto/professional.dto';

export const professionalSchema: yup.SchemaOf<TInputProfessionalDTO> = yup
  .object()
  .shape({
    bio: yup.string().required(),
    name: yup.string().required(),
    phone: yup.object().shape({
      ddd: yup.string().required(),
      number: yup.string().required(),
      ddi: yup.string().required(),
    }),
    email: yup.object().shape({
      email: yup.string().required(),
    }),
    categories_id: yup.array().of(yup.number()).required(),
  });
