import * as yup from 'yup';
import { TInputClientDTO } from '../../../../application/dto/client.dto';

export const clienteSchema: yup.SchemaOf<TInputClientDTO> = yup.object().shape({
  login: yup.object().shape({ email: yup.string().email().required() }),
  password: yup.string().optional(),
  name: yup.string().required(),
  phone: yup.object().shape({
    ddd: yup.string().required(),
    number: yup.string().required(),
    ddi: yup.string().required(),
  }),
});
