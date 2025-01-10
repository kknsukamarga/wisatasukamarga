import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Optional: filter by wisata ID

  try {
    if (id) {
      // Fetch fasilitasWisata related to a specific wisataId
      const fasilitasWisata = await prisma.fasilitasWisata.findMany({
        where: { id },
        include: {
          wisata: true, // Include the related Wisata data
        },
      });

      if (fasilitasWisata.length === 0) {
        return NextResponse.json(
          { error: "No fasilitasWisata found for the given wisataId" },
          { status: 404 }
        );
      }

      return NextResponse.json(fasilitasWisata);
    }

    // Fetch all fasilitasWisata records
    const allFasilitasWisata = await prisma.fasilitasWisata.findMany({
      include: {
        wisata: true, // Include the related Wisata data
      }});

    return NextResponse.json(allFasilitasWisata);
  } catch (error: any) {
    console.error("Error during GET fasilitasWisata:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { name, image, description, wisataId } = body;

    if (!name || !image || !description || !wisataId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create new fasilitas
    const newFasilitas = await prisma.fasilitasWisata.create({
      data: {
        name,
        image,
        description,
        wisataId,
      },
    });

    return NextResponse.json(newFasilitas, { status: 201 });
  } catch (error: any) {
    console.error("Error creating fasilitas:", error);
    return NextResponse.json(
      { error: "Failed to create fasilitas", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const existingFasilitas = await prisma.fasilitasWisata.findUnique({
      where: { id },
    });

    if (!existingFasilitas) {
      return NextResponse.json(
        { error: "Fasilitas not found" },
        { status: 404 }
      );
    }

    const { name, image, description } = body;

    if (!name || !image || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Update fasilitas
    const updatedFasilitas = await prisma.fasilitasWisata.update({
      where: { id },
      data: {
        name,
        image,
        description,
      },
    });

    return NextResponse.json(updatedFasilitas);
  } catch (error: any) {
    console.error("Error updating fasilitas:", error);
    return NextResponse.json(
      { error: "Failed to update fasilitas", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete fasilitas by id
    await prisma.fasilitasWisata.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Fasilitas deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting fasilitas:", error);
    return NextResponse.json(
      { error: "Failed to delete fasilitas", details: error.message },
      { status: 500 }
    );
  }
}
