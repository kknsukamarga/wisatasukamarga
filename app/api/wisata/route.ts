import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle all HTTP methods
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Fetch single wisata by id
      const wisata = await prisma.wisata.findUnique({
        where: { id },
      });

      if (!wisata) {
        return NextResponse.json({ error: "Wisata not found" }, { status: 404 });
      }

      return NextResponse.json(wisata);
    }

    // Fetch all wisatas
    const wisatas = await prisma.wisata.findMany();
    return NextResponse.json(wisatas);
  } catch (error: any) {
    console.error("Error during GET wisatas:", error); // Log error ke console
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { name, image, description, price, location, status } = body;

    // Validate input
    if (!name || !image || !description || !price || !location || !status) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newWisata = await prisma.wisata.create({
      data: {
        name,
        image,
        description,
        price,
        location,
        status,
      },
    });

    return NextResponse.json(newWisata, { status: 201 });
  } catch (error: any) {
    console.error("Error creating wisata:", error);
    return NextResponse.json(
      { error: "Failed to create wisata" },
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

    // Validate input
    if (!body.name && !body.image && !body.description && !body.price && !body.location && !body.status) {
      return NextResponse.json(
        { error: "At least one field is required to update" },
        { status: 400 }
      );
    }

    const updatedWisata = await prisma.wisata.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedWisata);
  } catch (error: any) {
    console.error("Error updating wisata:", error);
    return NextResponse.json(
      { error: "Failed to update wisata" },
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

    await prisma.wisata.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Wisata deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting wisata:", error);
    return NextResponse.json(
      { error: "Failed to delete wisata" },
      { status: 500 }
    );
  }
}
