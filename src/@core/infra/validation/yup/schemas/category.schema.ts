import * as yup from 'yup';
import { TInputCategoryDTO } from '../../../../application/dto/category.dto';

export const categorySchema: yup.SchemaOf<TInputCategoryDTO> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });
