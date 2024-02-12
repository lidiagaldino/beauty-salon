import { Category } from '../entities/category.entity';
import { Client } from '../entities/client.entity';
import { Professional } from '../entities/professional.entity';
import { Scheduling } from '../entities/scheduling.entity';
import { Service } from '../entities/services.entity';
import { Status } from '../entities/status.entity';

export interface ISchedulingRepository {
  create(scheduling: Scheduling): Promise<Scheduling>;
  findAll(): Promise<Scheduling[]>;
  findById(id: number): Promise<Scheduling>;
  update(scheduling: Scheduling): Promise<Scheduling>;
  delete(id: number): Promise<void>;
  findByClient(client: Client): Promise<Scheduling[]>;
  findByProfessional(professional: Professional): Promise<Scheduling[]>;
  findByService(service: Service): Promise<Scheduling[]>;
  findByStatus(status: Status): Promise<Scheduling[]>;
  findByDate(date: Date): Promise<Scheduling[]>;
  findByCategory(category: Category): Promise<Scheduling[]>;
}
