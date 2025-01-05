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
      // Fetch single wisata by id
      const wisata = await prisma.wisata.findUnique({
        where: { id},
      });

      if (!wisata) {
        return NextResponse.json({ error: "Wisata not found" }, { status: 404 });
      }

      return NextResponse.json(wisata);
    }

    // Fetch all wisata records
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

    // Upload Base64 image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "wisata",
      public_id: name.toLowerCase().replace(/\s+/g, "-"),
    });

    // Use the secure URL returned by Cloudinary
    const imageUrl = cloudinaryResponse.secure_url;

    const newWisata = await prisma.wisata.create({
      data: {
        name,
        image: imageUrl,
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

    const existingWisata = await prisma.wisata.findUnique({
      where: { id},
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

    const updatedWisata = await prisma.wisata.update({
      where: { id },
      data: {
        ...body,
        image: imageUrl,
      },
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
