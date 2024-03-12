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
    const createdStatus = Status.create({ name: result.status });
    createdStatus.setId(result.id);
    return createdStatus;
  }
  async findAll(): Promise<Status[]> {
    const result = await prisma.tbl_status.findMany();
    const status = result.map((item) => {
      const status = Status.create({ name: item.status });
      status.setId(item.id);
      return status;
    });

    return status;
  }
  async findById(id: number): Promise<Status> {
    const result = await prisma.tbl_status.findUnique({
      where: { id },
    });
    const status = Status.create({ name: result.status });
    status.setId(result.id);
    return status;
  }
  async update(status: Status): Promise<Status> {
    const result = await prisma.tbl_status.update({
      where: { id: status.getId() },
      data: { status: status.getName() },
    });
    const updatedStatus = Status.create({ name: result.status });
    updatedStatus.setId(result.id);
    return updatedStatus;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_status.delete({
      where: { id },
    });
    return;
  }
}