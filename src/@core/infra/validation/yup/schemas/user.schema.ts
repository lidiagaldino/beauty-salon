import * as yup from 'yup';
import {
  TInputUpdateUserDTO,
  TInputUserDTO,
} from '../../../../application/dto/user.dto';

export const userSchema: yup.SchemaOf<TInputUserDTO> = yup.object().shape({
  name: yup.string().required(),
  login: yup.string().email().required(),
  password: yup.string().required(),
});

export const updateUserSchema: yup.SchemaOf<TInputUpdateUserDTO> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });
