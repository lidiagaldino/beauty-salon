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
    const createdUser = User.create({
      name: result.name,
      login: result.login,
      password: result.password,
    });
    createdUser.setId(result.id);
    return createdUser;
  }
  async findAll(): Promise<User[]> {
    const result = await prisma.tbl_user.findMany();
    const users = result.map((item) => {
      const user = User.create({
        name: item.name,
        login: item.login,
        password: item.password,
      });
      user.setId(item.id);
      return user;
    });
    return users;
  }
  async findById(id: number): Promise<User> {
    const result = await prisma.tbl_user.findUnique({
      where: { id },
    });
    const user = User.create({
      name: result.name,
      login: result.login,
      password: result.password,
    });
    user.setId(result.id);
    return user;
  }
  async update(user: User): Promise<User> {
    const result = await prisma.tbl_user.update({
      where: { id: user.getId() },
      data: {
        name: user.getName(),
        login: user.getLogin(),
        password: user.getPassword(),
      },
    });
    const updatedUser = User.create({
      name: result.name,
      login: result.login,
      password: result.password,
    });
    updatedUser.setId(result.id);
    return updatedUser;
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
    const user = User.create({
      name: result.name,
      login: result.login,
      password: result.password,
    });
    user.setId(result.id);
    return user;
  }
}
