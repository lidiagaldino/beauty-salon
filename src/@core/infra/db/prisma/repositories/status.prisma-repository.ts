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

    status.setId(result.id);
    return status;
  }
  async findAll(): Promise<Status[]> {
    const result = await prisma.tbl_status.findMany();
    const status = result.map(this.mapOutput);
    return status;
  }
  async findById(id: number): Promise<Status> {
    const result = await prisma.tbl_status.findUnique({
      where: { id },
    });
    return this.mapOutput(result);
  }
  async update(status: Status): Promise<Status> {
    await prisma.tbl_status.update({
      where: { id: status.getId() },
      data: { status: status.getName() },
    });

    return status;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_status.delete({
      where: { id },
    });
    return;
  }

  private mapOutput(input: {id: number, name: string}): Status {
    const status = Status.create({ name: input.name });
    status.setId(input.id);
    return status;
  }
}
