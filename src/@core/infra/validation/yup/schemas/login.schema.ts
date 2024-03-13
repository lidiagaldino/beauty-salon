import * as yup from 'yup';
import { TInputLogin } from '../../../../application/dto/login.dto';

export const loginSchema: yup.SchemaOf<TInputLogin> = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().required(),
});
