import { Professional } from '../entities/professional.entity';

export interface IProfessionalRepository {
  create(professional: Professional): Promise<Professional>;
  findAll(): Promise<Professional[]>;
  findById(id: number): Promise<Professional>;
  update(professional: Professional): Promise<Professional>;
  delete(id: number): Promise<void>;
}
