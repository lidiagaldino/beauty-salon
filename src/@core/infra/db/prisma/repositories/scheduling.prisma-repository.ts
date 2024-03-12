import { prisma } from '..';
import { Category } from '../../../../domain/entities/category.entity';
import { Client } from '../../../../domain/entities/client.entity';
import { Professional } from '../../../../domain/entities/professional.entity';
import { Scheduling } from '../../../../domain/entities/scheduling.entity';
import { Service } from '../../../../domain/entities/services.entity';
import { Status } from '../../../../domain/entities/status.entity';
import { ISchedulingRepository } from '../../../../domain/repositories/scheduling.repository';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Phone } from '../../../../domain/value-objects/phone.value-object';

export class SchedulingPrismaRepository implements ISchedulingRepository {
  async create(scheduling: Scheduling): Promise<Scheduling> {
    const result = await prisma.tbl_scheduling.create({
      data: {
        service: { connect: { id: scheduling.getService().getId() } },
        date: scheduling.getDate(),
        status: { connect: { id: scheduling.getStatus().getId() } },
        professional: { connect: { id: scheduling.getProfessional().getId() } },
        client: { connect: { id: scheduling.getClient().getId() } },
        discount: scheduling.getDiscount(),
        total: scheduling.getTotal(),
      },
    });
    scheduling.setId(result.id);
    return scheduling;
  }
  async findAll(): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }
  async findById(id: number): Promise<Scheduling> {
    const result = await prisma.tbl_scheduling.findUnique({
      where: { id },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const scheduling = this.mapOutput(result);
    return scheduling;
  }
  async update(scheduling: Scheduling): Promise<Scheduling> {
    const result = await prisma.tbl_scheduling.update({
      where: { id: scheduling.getId() },
      data: {
        service: { connect: { id: scheduling.getService().getId() } },
        date: scheduling.getDate(),
        status: { connect: { id: scheduling.getStatus().getId() } },
        professional: { connect: { id: scheduling.getProfessional().getId() } },
        client: { connect: { id: scheduling.getClient().getId() } },
        discount: scheduling.getDiscount(),
        total: scheduling.getTotal(),
      },
    });
    scheduling.setId(result.id);
    return scheduling;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_scheduling.delete({
      where: { id },
    });
    return;
  }
  async findByClient(client: Client): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      where: { client: { id: client.getId() } },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }
  async findByProfessional(professional: Professional): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      where: { professional: { id: professional.getId() } },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }
  async findByService(service: Service): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      where: { service: { id: service.getId() } },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }
  async findByStatus(status: Status): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      where: { status: { id: status.getId() } },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }
  async findByDate(date: Date): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      where: { date },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }
  async findByCategory(category: Category): Promise<Scheduling[]> {
    const result = await prisma.tbl_scheduling.findMany({
      where: { service: { category: { id: category.getId() } } },
      include: {
        service: { include: { category: true } },
        status: true,
        client: true,
        professional: {
          include: {
            tbl_professional_category: { select: { category: true } },
          },
        },
      },
    });
    const schedules = result.map(this.mapOutput);
    return schedules;
  }

  private mapOutput(input: any): Scheduling {
    const category = Category.create({ name: input.service.category.name });
    category.setId(input.service.category.id);
    const service = Service.create({
      name: input.service.name,
      category: category,
      price: input.service.price,
      duration: input.service.duration,
    });
    service.setId(input.service.id);
    const status = Status.create({
      name: input.status.status,
    });
    status.setId(input.status.id);
    const client = Client.create({
      name: input.client.name,
      phone: Phone.create({
        ddd: input.client.phone,
        ddi: input.client.phone,
        number: input.client.phone,
      }),
      login: Email.create({ email: input.client.login }),
    });
    client.setId(input.client.id);
    const professional = Professional.create({
      name: input.professional.name,
      bio: input.professional.bio,
      categories: input.professional.tbl_professional_category.map((cat) => {
        const category = Category.create({ name: cat.category.name });
        category.setId(cat.category.id);
        return category;
      }),
      email: Email.create({ email: input.professional.email }),
      phone: Phone.create({
        ddd: input.professional.phone,
        ddi: input.professional.phone,
        number: input.professional.phone,
      }),
    });
    professional.setId(input.professional.id);
    const scheduling = Scheduling.create({
      service,
      date: input.date,
      status,
      professional,
      client,
      discount: input.discount,
      total: input.total,
    });
    scheduling.setId(input.id);
    return scheduling;
  }
}
