import * as yup from 'yup';
import { TInputStatusDTO } from '../../../../application/dto/status.dto';

export const statusSchema: yup.SchemaOf<TInputStatusDTO> = yup.object().shape({
  name: yup.string().required(),
});
