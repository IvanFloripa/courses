// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy recipes
  const course1 = await prisma.course.upsert({
    where: { title: 'React Practice Course' },
    update: {},
    create: {
      title: 'React Practice Course',
      description: 'React practice course for beginners',
      rating: '5',
      totalHours: '4.5'
    }
  });

  const course2 = await prisma.course.upsert({
    where: { title: 'Chicken Curry' },
    update: {},
    create: {
        title: 'Nest JS Practice Course',
        description: 'Nestjs practice course for beginners',
        rating: '4.5',
        totalHours: '4.5'
      }
  });

  console.log({ course1, course2 });
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });