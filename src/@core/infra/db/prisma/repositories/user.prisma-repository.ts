import { prisma } from '..';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/user.repository';

export class UserPrismaRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const result = await prisma.tbl_user.create({
      data: {
        name: user.getName(),
        login: user.getLogin(),
        password: user.getPassword(),
      },
    });

    user.setId(result.id);
    return user;
  }
  async findAll(): Promise<User[]> {
    const result = await prisma.tbl_user.findMany();
    const users = result.map(this.mapOutput);
    return users;
  }
  async findById(id: number): Promise<User> {
    const result = await prisma.tbl_user.findUnique({
      where: { id },
    });
    return this.mapOutput(result);
  }
  async update(user: User): Promise<User> {
    await prisma.tbl_user.update({
      where: { id: user.getId() },
      data: {
        name: user.getName(),
        login: user.getLogin(),
        password: user.getPassword(),
      },
    });
    return user;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_user.delete({
      where: { id },
    });
    return;
  }
  async findByLogin(login: string): Promise<User> {
    const result = await prisma.tbl_user.findUnique({
      where: { login },
    });
    return this.mapOutput(result);
  }

  private mapOutput(input: {id: number, name: string, login: string, password: string}): User {
    const user = User.create({
      name: input.name,
      login: input.login,
      password: input.password,
    });
    user.setId(input.id);
    return user;
  }
}
