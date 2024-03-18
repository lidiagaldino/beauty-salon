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
    return result.map(this.mapOutput)
  }
  async findById(id: number): Promise<Client> {
    const result = await prisma.tbl_client.findUnique({
      where: { id },
    });
    if (!result) return null;
    return this.mapOutput(result);
  }
  async update(client: Client): Promise<Client> {
    await prisma.tbl_client.update({
      where: { id: client.getId() },
      data: {
        name: client.getName(),
        login: client.getLogin().email,
        phone: client.getPhone().toStringFormat(),
      },
    });

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
    return this.mapOutput(result);
  }

  private mapOutput(input: {id: number, name: string, login: string, phone: string}): Client {
    const client = Client.create({
      name: input.name,
      login: Email.create({ email: input.login }),
      phone: Phone.createFromString(input.phone),
    });
    client.setId(input.id);
    return client;
  }
}
