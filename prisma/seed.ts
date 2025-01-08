import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

enum BlogCategory {
  TEMPAT_WISATA = "TEMPAT_WISATA",
  KARYA_UMKM = "KARYA_UMKM",
}

async function main() {
  const titles = [
    "Petualangan di Negeri Awan",
    "Menyusuri Sungai Kenangan",
    "Mimpi di Balik Pintu Tua",
    "Rahasia Pohon Beringin",
    "Kisah di Balik Senja",
    "Jejak Langkah di Pasir Pantai",
    "Bunga yang Tak Pernah Layu",
    "Hujan dan Kenangan",
    "Di Balik Jendela yang Retak",
    "Lautan yang Berbisik",
    "Rindu di Tengah Hutan",
    "Pelangi Setelah Badai",
    "Denting Piano di Tengah Malam",
    "Sepeda Tua di Sudut Desa",
    "Jendela yang Menghadap Langit",
    "Bayangan di Balik Cermin",
    "Rahasia di Balik Buku Usang",
    "Suara di Balik Dinding",
    "Langkah Kaki di Lorong Sepi",
    "Kisah Batu dan Air",
    "Nyanyian Angin di Padang Ilalang",
    "Lilin yang Tak Pernah Padam",
    "Bintang yang Menyala Sendiri",
    "Gema di Balik Gunung",
    "Bayangan di Bawah Pohon Cemara",
    "Kenangan yang Membeku",
    "Angin yang Berbisik Namamu",
    "Langkah Pertama ke Bulan",
    "Jembatan Menuju Surga",
    "Hujan di Balik Pelangi",
    "Kopi dan Cerita Tengah Malam",
    "Lilin yang Menyala di Tengah Gelap",
    "Rahasia Langit Malam",
    "Burung yang Tak Pernah Terbang",
    "Senja di Atas Awan",
    "Ombak yang Menghapus Jejak",
    "Pohon yang Bercerita",
    "Langit yang Berwarna Merah",
    "Petualangan di Tengah Gurun",
    "Rahasia di Balik Batu Karang",
    "Suara dari Masa Lalu",
    "Mimpi yang Tak Pernah Usai",
    "Jejak di Atas Salju",
    "Dentingan Gelas di Malam Sepi",
    "Rindu yang Tak Sampai",
    "Sajak untuk Bintang Jatuh",
    "Sepotong Kue di Meja Kayu",
    "Bayangan di Balik Pintu",
    "Langkah di Tengah Hujan",
  ];

  const authors = ["Alma", "Akhdan", "Ucup", "Fadil"];

  const blogs = [];
  const usedSlugs = new Set();

  for (const title of titles) {
    let slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Ensure unique slug
    let suffix = 1;
    while (usedSlugs.has(slug)) {
      slug = `${slug}-${suffix}`;
      suffix++;
    }
    usedSlugs.add(slug);

    blogs.push({
      title,
      slug,
      coverImage:
        "https://res.cloudinary.com/dflmvraib/image/upload/v1736183771/blogs/anak-senja-desa-sukamarga.jpg",
      content: faker.lorem.paragraphs(faker.number.int({ min: 3, max: 10 })),
      author: authors[Math.floor(Math.random() * authors.length)],
      category:
        Math.random() < 0.5
          ? BlogCategory.TEMPAT_WISATA
          : BlogCategory.KARYA_UMKM,
      createdAt: faker.date.past(),
    });
  }

  await prisma.blog.createMany({
    data: blogs,
  });

  console.log("50 blog entries seeded successfully!");
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
