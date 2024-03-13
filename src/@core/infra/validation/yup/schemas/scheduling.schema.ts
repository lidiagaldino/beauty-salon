import * as yup from 'yup';
import { TInputSchedulingDTO } from '../../../../application/dto/scheduling.dto';

export const schedulingSchema: yup.SchemaOf<TInputSchedulingDTO> = yup
  .object()
  .shape({
    date: yup.date().required(),
    professional_id: yup.number().required(),
    service_id: yup.number().required(),
    client_id: yup.number().required(),
    discount: yup.number().optional(),
    status_id: yup.number().required(),
  });
