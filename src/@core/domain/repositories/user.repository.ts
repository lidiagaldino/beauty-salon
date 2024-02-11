import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
  findByLogin(login: string): Promise<User>;
}
