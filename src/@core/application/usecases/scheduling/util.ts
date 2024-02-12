import { Scheduling } from '../../../domain/entities/scheduling.entity';
import { TOutputSchedulingDTO } from '../../dto/scheduling.dto';

export function mapOutput(input: Scheduling): TOutputSchedulingDTO {
  return {
    id: input.getId(),
    date: input.getDate(),
    status_id: input.getStatus().getId(),
    client_id: input.getClient().getId(),
    professional_id: input.getProfessional().getId(),
    discount: input.getDiscount(),
    service_id: input.getService().getId(),
    total: input.getTotal(),
  };
}
