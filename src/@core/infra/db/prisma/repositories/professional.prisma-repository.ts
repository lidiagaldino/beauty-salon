import { prisma } from '..';
import { Category } from '../../../../domain/entities/category.entity';
import { Professional } from '../../../../domain/entities/professional.entity';
import { IProfessionalRepository } from '../../../../domain/repositories/professional.repository';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Phone } from '../../../../domain/value-objects/phone.value-object';

export class ProfessionalPrismaRepository implements IProfessionalRepository {
  async create(professional: Professional): Promise<Professional> {
    const result = await prisma.tbl_professional.create({
      data: {
        bio: professional.getBio(),
        name: professional.getName(),
        phone: professional.getPhone().toString(),
        email: professional.getEmail().toString(),
        tbl_professional_category: {
          createMany: {
            data: professional
              .getCategories()
              .map((c) => ({ category_id: c.getId() })),
          },
        },
      },
      include: { tbl_professional_category: { select: { category: true } } },
    });
    professional.setId(result.id);
    return professional;
  }
  async findAll(): Promise<Professional[]> {
    const result = await prisma.tbl_professional.findMany({
      include: {
        tbl_professional_category: {
          select: { category: true },
        },
      },
    });
    const professionals = result.map((item) => {
      const categories = item.tbl_professional_category.map((c) => {
        const newCategory = Category.create({
          name: c.category.name,
        });
        newCategory.setId(c.category.id);
        return newCategory;
      });
      const professional = Professional.create({
        bio: item.bio,
        name: item.name,
        phone: Phone.createFromString(item.phone),
        email: Email.create({
          email: item.email,
        }),
        categories: categories,
      });
      professional.setId(item.id);
      return professional;
    });
    return professionals;
  }
  async findById(id: number): Promise<Professional> {
    const result = await prisma.tbl_professional.findUnique({
      where: { id },
      include: { tbl_professional_category: { include: { category: true } } },
    });
    const professional = Professional.create({
      bio: result.bio,
      categories: result.tbl_professional_category.map((c) => {
        const category = Category.create({ name: c.category.name });
        category.setId(c.category.id);
        return category;
      }),
      email: Email.create({ email: result.email }),
      name: result.name,
      phone: Phone.createFromString(result.phone),
    });
    return professional;
  }
  async update(professional: Professional): Promise<Professional> {
    const professionalCategories =
      await prisma.tbl_professional_category.findMany({
        where: { professional_id: professional.getId() },
      });
    const categories = professional.getCategories().filter((c) => {
      return !professionalCategories.some((pc) => pc.category_id === c.getId());
    });
    await prisma.$transaction([
      prisma.tbl_professional.update({
        where: { id: professional.getId() },
        data: {
          bio: professional.getBio(),
          email: professional.getEmail().email,
          name: professional.getName(),
          phone: professional.getPhone().toStringFormat(),
        },
      }),
      ...categories.map((c) =>
        prisma.tbl_professional_category.create({
          data: {
            category: { connect: { id: c.getId() } },
            professional: { connect: { id: professional.getId() } },
          },
        }),
      ),
    ]);
    return professional;
  }
  async delete(id: number): Promise<void> {
    await prisma.tbl_professional.delete({ where: { id } });
    return;
  }
}
