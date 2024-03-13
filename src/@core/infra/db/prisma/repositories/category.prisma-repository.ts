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
    const createdCategory = Category.create({ name: result.name });
    createdCategory.setId(result.id);
    return createdCategory;
  }
  async findAll(): Promise<Category[]> {
    const result = await prisma.tbl_category.findMany();
    const categories = result.map((item) => {
      const category = Category.create({ name: item.name });
      category.setId(item.id);
      return category;
    });
    return categories.length > 0 ? categories : null;
  }
  async findById(id: number): Promise<Category> {
    const result = await prisma.tbl_category.findUnique({
      where: { id },
    });
    if (!result) return null;
    const category = Category.create({ name: result.name });
    category.setId(result.id);
    return category;
  }
  async update(category: Category): Promise<Category> {
    const result = await prisma.tbl_category.update({
      where: { id: category.getId() },
      data: { name: category.getName() },
    });
    const updatedCategory = Category.create({ name: result.name });
    updatedCategory.setId(result.id);
    return updatedCategory;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_category.delete({
      where: { id },
    });
    return;
  }
}
