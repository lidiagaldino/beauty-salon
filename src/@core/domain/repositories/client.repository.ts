import { Client } from '../entities/client.entity';

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client>;
  update(client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
  findByLogin(login: string): Promise<Client>;
}
