import { Client } from '../../../domain/entities/client.entity';
import { TOutputClientDTO } from '../../dto/client.dto';

export function mapOutput(input: Client): TOutputClientDTO {
  return {
    id: input.getId(),
    name: input.getName(),
    phone: input.getPhone().toJSON(),
    login: input.getLogin().toJSON(),
  };
}
