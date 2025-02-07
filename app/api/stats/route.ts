import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch data dari database
    const totalUsers = await prisma.user.count();
    const totalBlogs = await prisma.blog.count();
    const totalUmkm = await prisma.umkm.count();
    const totalWisata = await prisma.wisata.count();
    const totalFasilitasWisata = await prisma.fasilitasWisata.count();

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalBlogs,
        totalUmkm,
        totalWisata,
        totalFasilitasWisata,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil statistik" },
      { status: 500 }
    );
  }
}
