import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createFasilitas(fasilitas: any[], wisataId: string) {
  if (!fasilitas || !Array.isArray(fasilitas)) {
    throw new Error("Invalid fasilitas data provided.");
  }

  const createdFasilitas = await prisma.fasilitasWisata.createMany({
    data: fasilitas.map((fasilitasItem) => ({
      ...fasilitasItem,
      wisataId,
    })),
  });

  return createdFasilitas;
}

export async function deleteAllFasilitasForWisata(wisataId: string) {
  if (!wisataId) {
    throw new Error("Wisata ID is required to delete fasilitas.");
  }

  const deleted = await prisma.fasilitasWisata.deleteMany({
    where: {
      wisataId,
    },
  });

  return deleted;
}

export async function updateFasilitas(fasilitas: any[], wisataId: string) {
  // Delete existing fasilitas
  await deleteAllFasilitasForWisata(wisataId);

  // Create new fasilitas
  const updatedFasilitas = await createFasilitas(fasilitas, wisataId);

  return updatedFasilitas;
}
