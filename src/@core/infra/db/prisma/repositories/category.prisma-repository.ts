import { prisma } from '..';
import { Category } from '../../../../domain/entities/category.entity';
import { ICategoryRepository } from '../../../../domain/repositories/category.repository';

export class CategoryPrismaRepository implements ICategoryRepository {
  async create(category: Category): Promise<Category> {
    const result = await prisma.tbl_category.create({
      data: {
        name: category.getName(),
      },
    });
    category.setId(result.id);
    return category;
  }
  async findAll(): Promise<Category[]> {
    const result = await prisma.tbl_category.findMany();
    if(result.length == 0) return null;
    return result.map(this.mapOutput);
  }
  async findById(id: number): Promise<Category> {
    const result = await prisma.tbl_category.findUnique({
      where: { id },
    });
    if (!result) return null;
    return this.mapOutput(result);
  }
  async update(category: Category): Promise<Category> {
    await prisma.tbl_category.update({
      where: { id: category.getId() },
      data: { name: category.getName() },
    });
    return category;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_category.delete({
      where: { id },
    });
    return;
  }

  private mapOutput(input: {id: number, name: string}): Category {
    const category = Category.create({ name: input.name });
    category.setId(input.id);
    return category;
  }
}
