import { Status } from '../entities/status.entity';

export interface IStatusRepository {
  create(status: Status): Promise<Status>;
  findAll(): Promise<Status[]>;
  findById(id: number): Promise<Status>;
  update(status: Status): Promise<Status>;
  delete(id: number): Promise<void>;
}
