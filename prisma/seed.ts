import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.tbl_status.createMany({
    data: [
      { status: 'Scheduled' },
      { status: 'Canceled' },
      { status: 'Done' },
      { status: 'Confirmed' },
    ],
  });

  await prisma.tbl_category.createMany({
    data: [{ name: 'Hair' }, { name: 'Beard' }, { name: 'Nails' }],
  });

  await prisma.tbl_service.createMany({
    data: [
      {
        name: 'Short Female Haircut',
        duration: 50,
        price: 30.0,
        category_id: 1,
      },
      {
        name: 'Long Female Haircut',
        category_id: 1,
        duration: 50,
        price: 40.0,
      },
      { name: 'Nails', category_id: 3, duration: 50, price: 30.0 },
      { name: 'Short Male Haircut', category_id: 1, duration: 50, price: 30.0 },
      { name: 'Long Male Haircut', category_id: 1, duration: 50, price: 40.0 },
      { name: 'Simple Beard', category_id: 2, duration: 30, price: 20.0 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
