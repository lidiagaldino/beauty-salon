import * as yup from 'yup';
import { TInputServicesDTO } from '../../../../application/dto/services.dto';

export const serviceSchema: yup.SchemaOf<TInputServicesDTO> = yup
  .object()
  .shape({
    name: yup.string().required(),
    price: yup.number().required(),
    category_id: yup.number().required(),
    duration: yup.number().required(),
  });
