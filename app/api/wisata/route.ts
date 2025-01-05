import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle all HTTP methods
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Fetch single wisata by id, including related fasilitas
      const wisata = await prisma.wisata.findUnique({
        where: { id },
        include: {
          fasilitasWisata: true,
        },
      });

      if (!wisata) {
        return NextResponse.json(
          { error: "Wisata not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(wisata);
    }

    // Fetch all wisata records, including related fasilitas
    const wisatas = await prisma.wisata.findMany({
      include: {
        fasilitasWisata: true,
      },
    });

    return NextResponse.json(wisatas);
  } catch (error: any) {
    console.error("Error during GET wisatas:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Upload new Base64 image to Cloudinary if provided

  try {
    const { name, image, description, price, location, status } = body;

    if (!name || !image || !description || !price || !location || !status) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof price !== "number") {
      return NextResponse.json(
        { error: "Price must be a valid number" },
        { status: 400 }
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(body.image, {
      folder: "wisata",
      public_id: body.name.toLowerCase().replace(/\s+/g, "-"),
    });

    const imageUrl = cloudinaryResponse.secure_url;

    const newWisata = await prisma.wisata.create({
      data: {
        name,
        image: imageUrl,
        description,
        price, // Price is now guaranteed to be an integer
        location,
        status,
      },
    });

    return NextResponse.json(newWisata, { status: 201 });
  } catch (error: any) {
    console.error("Error creating wisata:", error);
    return NextResponse.json(
      { error: "Failed to create wisata", details: error.message },
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

    const existingWisata = await prisma.wisata.findUnique({
      where: { id },
      include: { fasilitasWisata: true },
    });

    if (!existingWisata) {
      return NextResponse.json({ error: "Wisata not found" }, { status: 404 });
    }

    let imageUrl = existingWisata.image; // Default to existing image URL

    // Upload new Base64 image to Cloudinary if provided
    if (body.image && body.image !== imageUrl) {
      const cloudinaryResponse = await cloudinary.uploader.upload(body.image, {
        folder: "wisata",
        public_id: body.name.toLowerCase().replace(/\s+/g, "-"),
      });

      imageUrl = cloudinaryResponse.secure_url;
    }

    // Update Wisata and handle related FasilitasWisata
    const updatedWisata = await prisma.wisata.update({
      where: { id },
      data: {
        name: body.name,
        image: imageUrl,
        description: body.description,
        price: body.price,
        location: body.location,
        status: body.status,
        fasilitasWisata: {
          deleteMany: {}, // Delete existing fasilitas
          create: body.fasilitasWisata?.map((fasilitas: any) => ({
            name: fasilitas.name,
            image: fasilitas.image,
            description: fasilitas.description,
          })),
        },
      },
      include: {
        fasilitasWisata: true,
      },
    });

    return NextResponse.json(updatedWisata);
  } catch (error: any) {
    console.error("Error updating wisata:", error);
    return NextResponse.json(
      { error: "Failed to update wisata", details: error.message },
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

    // Delete Wisata and its related FasilitasWisata
    await prisma.wisata.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Wisata deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting wisata:", error);
    return NextResponse.json(
      { error: "Failed to delete wisata", details: error.message },
      { status: 500 }
    );
  }
}
