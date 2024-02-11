import { Service } from '../../../domain/entities/services.entity';
import { TOutputServicesDTO } from '../../dto/services.dto';

export function mapOutput(service: Service): TOutputServicesDTO {
  return {
    id: service.getId(),
    name: service.getName(),
    price: service.getPrice(),
    duration: service.getDuration(),
    category_id: service.getCategory().getId(),
  };
}
