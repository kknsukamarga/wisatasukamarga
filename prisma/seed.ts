import { PrismaClient, umkmCategory } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const umkmData = Array.from({ length: 100 }, (_, index) => ({
    product_name: faker.commerce.productName(),
    slug: `${faker.helpers.slugify(faker.commerce.productName())}-${index + 1}`,
    image: Array.from({ length: 3 }, () => faker.image.url()), // Random image URLs
    price: faker.number.int({ min: 10000, max: 10000000 }), // Random price
    description: faker.lorem.sentences(2),
    owner: faker.person.fullName(),
    category: faker.helpers.arrayElement([
      umkmCategory.service,
      umkmCategory.product,
    ]), // Random enum value
    wanumber: `+62${faker.string.numeric(9)}`, // Random 9-digit Indonesian phone number
  }));

  for (const umkm of umkmData) {
    await prisma.umkm.upsert({
      where: { slug: umkm.slug },
      update: {},
      create: umkm,
    });
  }

  console.log("Seeding completed with 100 records!");
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
