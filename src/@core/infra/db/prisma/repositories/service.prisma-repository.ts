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
    const services = result.map((item) => {
      const category = Category.create({
        name: item.category.name,
      });
      category.setId(item.category.id);
      const service = Service.create({
        name: item.name,
        price: item.price,
        duration: item.duration,
        category,
      });
      service.setId(item.id);
      return service;
    });
    return services;
  }
  async findById(id: number): Promise<Service> {
    const result = await prisma.tbl_service.findUnique({
      where: { id },
      include: { category: true },
    });
    const category = Category.create({
      name: result.category.name,
    });
    category.setId(result.category.id);
    const service = Service.create({
      name: result.name,
      price: result.price,
      duration: result.duration,
      category,
    });
    service.setId(result.id);
    return service;
  }
  async update(service: Service): Promise<Service> {
    const result = await prisma.tbl_service.update({
      where: { id: service.getId() },
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
    const services = result.map((item) => {
      const category = Category.create({
        name: item.category.name,
      });
      category.setId(item.category.id);
      const service = Service.create({
        name: item.name,
        price: item.price,
        duration: item.duration,
        category,
      });
      service.setId(item.id);
      return service;
    });
    return services;
  }
}
