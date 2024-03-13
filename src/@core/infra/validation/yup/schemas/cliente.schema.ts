import * as yup from 'yup';
import {
  TInputClientDTO,
  TInputUpdateClientDTO,
} from '../../../../application/dto/client.dto';

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

export const updateClientSchema: yup.SchemaOf<TInputUpdateClientDTO> = yup
  .object()
  .shape({
    name: yup.string().required(),
    phone: yup.object().shape({
      ddd: yup.string().required(),
      number: yup.string().required(),
      ddi: yup.string().required(),
    }),
  });
