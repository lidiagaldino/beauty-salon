import { prisma } from '..';
import { Client } from '../../../../domain/entities/client.entity';
import { IClientRepository } from '../../../../domain/repositories/client.repository';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Phone } from '../../../../domain/value-objects/phone.value-object';

export class ClientPrismaRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    const result = await prisma.tbl_client.create({
      data: {
        name: client.getName(),
        login: client.getLogin().email,
        password: client.getPassword(),
        phone: client.getPhone().toStringFormat(),
      },
    });

    client.setId(result.id);
    return client;
  }
  async findAll(): Promise<Client[]> {
    const result = await prisma.tbl_client.findMany();
    const clients = result.map((item) => {
      const client = Client.create({
        name: item.name,
        login: Email.create({ email: item.login }),
        phone: Phone.createFromString(item.phone),
      });
      client.setId(item.id);
      return client;
    });
    return clients;
  }
  async findById(id: number): Promise<Client> {
    const result = await prisma.tbl_client.findUnique({
      where: { id },
    });
    if (!result) return null;
    const client = Client.create({
      name: result.name,
      login: Email.create({ email: result.login }),
      phone: Phone.createFromString(result.phone),
    });
    client.setId(result.id);
    return client;
  }
  async update(client: Client): Promise<Client> {
    const result = await prisma.tbl_client.update({
      where: { id: client.getId() },
      data: {
        name: client.getName(),
        login: client.getLogin().email,
        phone: client.getPhone().toStringFormat(),
      },
    });
    client.setId(result.id);
    return client;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_client.delete({
      where: { id },
    });
    return;
  }
  async findByLogin(login: string): Promise<Client> {
    const result = await prisma.tbl_client.findUnique({
      where: { login },
    });
    if (!result) return null;
    const client = Client.create({
      name: result.name,
      login: Email.create({ email: result.login }),
      phone: Phone.createFromString(result.phone),
    });
    client.setId(result.id);
    return client;
  }
}
