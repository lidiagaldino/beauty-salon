import { prisma } from '..';
import { Category } from '../../../../domain/entities/category.entity';
import { Service } from '../../../../domain/entities/services.entity';
import { IServiceRepository } from '../../../../domain/repositories/service.repository';

export class ServicePrismaRepository implements IServiceRepository {
  async create(service: Service): Promise<Service> {
    const result = await prisma.tbl_service.create({
      data: {
        name: service.getName(),
        price: service.getPrice(),
        duration: service.getDuration(),
        category: { connect: { id: service.getCategory().getId() } },
      },
    });
    service.setId(result.id);
    return service;
  }
  async findAll(): Promise<Service[]> {
    const result = await prisma.tbl_service.findMany({
      include: { category: true },
    });
    const services = result.map(this.mapOutput);
    return services;
  }
  async findById(id: number): Promise<Service> {
    const result = await prisma.tbl_service.findUnique({
      where: { id },
      include: { category: true },
    });
    return this.mapOutput(result);
  }
  async update(service: Service): Promise<Service> {
    await prisma.tbl_service.update({
      where: { id: service.getId() },
      data: {
        name: service.getName(),
        price: service.getPrice(),
        duration: service.getDuration(),
        category: { connect: { id: service.getCategory().getId() } },
      },
    });
    return service;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_service.delete({
      where: { id },
    });
    return;
  }
  async findByCategory(category: Category): Promise<Service[]> {
    const result = await prisma.tbl_service.findMany({
      where: { category: { id: category.getId() } },
      include: { category: true },
    });
    const services = result.map(this.mapOutput);
    return services;
  }

  private mapOutput(input): Service {
    const category = Category.create({ name: input.category.name });
    category.setId(input.category.id);
    const service = Service.create({
      name: input.name,
      price: input.price,
      duration: input.duration,
      category,
    });
    service.setId(input.id);
    return service;
  }
}
