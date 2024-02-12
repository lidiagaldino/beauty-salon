import { prisma } from '..';
import { Status } from '../../../../domain/entities/status.entity';
import { IStatusRepository } from '../../../../domain/repositories/status.repository';

export class StatusPrismaRepository implements IStatusRepository {
  async create(status: Status): Promise<Status> {
    const result = await prisma.tbl_status.create({
      data: {
        status: status.getName(),
      },
    });
    return Status.create({ name: result.status });
  }
  async findAll(): Promise<Status[]> {
    const result = await prisma.tbl_status.findMany();
    return result.map((status) => Status.create({ name: status.status }));
  }
  async findById(id: number): Promise<Status> {
    const result = await prisma.tbl_status.findUnique({
      where: { id },
    });
    return Status.create({ name: result.status });
  }
  async update(status: Status): Promise<Status> {
    const result = await prisma.tbl_status.update({
      where: { id: status.getId() },
      data: { status: status.getName() },
    });
    return Status.create({ name: result.status });
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_status.delete({
      where: { id },
    });
    return;
  }
}
