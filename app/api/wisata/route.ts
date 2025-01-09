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
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const pageSize: any = searchParams.get("pageSize");
  const search = searchParams.get("search");

  let wisatas = await prisma.wisata.findMany({
    include: {
      fasilitasWisata: true,
    },
  });

  try {
    if (id) {
      // Fetch wisata by id, including related fasilitas
      const wisata = await prisma.wisata.findUnique({
        where: { id },
        include: {
          fasilitasWisata: true,
        },
      });

      if (!wisata) {
        return NextResponse.json(
          { error: "Wisata tidak ditemukan" },
          { status: 404 }
        );
      }
      const data = { wisata: wisata, length: wisatas.length };
      return NextResponse.json(data);
    }

    if (page) {
      if (search) {
        const wisatasSearch = await prisma.wisata.findMany({
          where: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          },
        });

        const wisatasSearchPaginate = await prisma.wisata.findMany({
          skip: (parseInt(page) - 1) * (parseInt(pageSize) || 10),
          take: parseInt(pageSize) || 10,
          where: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          },
          include: {
            fasilitasWisata: true,
          },
        });

        if (!wisatasSearch) {
          return NextResponse.json(
            { error: "Wisata tidak ditemukan" },
            { status: 404 }
          );
        }

        const data = {
          wisata: wisatasSearchPaginate,
          length: wisatasSearch.length,
        };
        return NextResponse.json(data);
      }

      const wisatasPage = await prisma.wisata.findMany({
        skip: (parseInt(page) - 1) * (parseInt(pageSize) || 10),
        take: parseInt(pageSize) || 10,
        include: {
          fasilitasWisata: true,
        },
      });

      if (!wisatasPage) {
        return NextResponse.json(
          { error: "Wisata tidak ditemukan" },
          { status: 404 }
        );
      }

      const data = { wisata: wisatasPage, length: wisatas.length };
      return NextResponse.json(data);
    }

    // Fetch all wisata records, including related fasilitas
    return NextResponse.json(wisatas);
  } catch (error: any) {
    console.error("Terjadi kesalahan saat mengambil data wisata:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const {
      name,
      imageCover,
      description,
      price,
      location,
      status,
      image,
      fasilitasWisata,
    } = body;

    if (
      !name ||
      !imageCover ||
      !description ||
      !price ||
      !location ||
      !status ||
      !image ||
      !image.length
    ) {
      return NextResponse.json(
        { error: "All fields are required, including images" },
        { status: 400 }
      );
    }

    if (typeof price !== "number") {
      return NextResponse.json(
        { error: "Price must be a valid number" },
        { status: 400 }
      );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(imageCover, {
      folder: "wisata",
      public_id: name.toLowerCase().replace(/\s+/g, "-"),
    });

    const imageCoverUrl = cloudinaryResponse.secure_url;

    const imageUrls = await Promise.all(
      image.map(async (img: any, index: any) => {
        const response = await cloudinary.uploader.upload(img, {
          folder: "wisata/images",
          public_id: `${name
            .toLowerCase()
            .replace(/\s+/g, "-")}-image-${index}`,
        });
        return response.secure_url;
      })
    );

    const newWisata = await prisma.wisata.create({
      data: {
        name,
        imageCover: imageCoverUrl,
        description,
        price,
        location,
        status,
        image: imageUrls,
        fasilitasWisata: {
          create: fasilitasWisata?.map((fasilitas: any) => ({
            name: fasilitas.name,
            image: fasilitas.image,
            description: fasilitas.description,
          })),
        },
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

    let imageCoverUrl = existingWisata.imageCover;

    if (body.imageCover && body.imageCover !== imageCoverUrl) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        body.imageCover,
        {
          folder: "wisata",
          public_id: body.name.toLowerCase().replace(/\s+/g, "-"),
        }
      );

      imageCoverUrl = cloudinaryResponse.secure_url;
    }

    const imageUrls = body.image
      ? await Promise.all(
          body.image.map(async (img: any, index: any) => {
            const response = await cloudinary.uploader.upload(img, {
              folder: "wisata/images",
              public_id: `${body.name
                .toLowerCase()
                .replace(/\s+/g, "-")}-image-${index}`,
            });
            return response.secure_url;
          })
        )
      : existingWisata.image;

    const updatedWisata = await prisma.wisata.update({
      where: { id },
      data: {
        name: body.name,
        imageCover: imageCoverUrl,
        description: body.description,
        price: body.price,
        location: body.location,
        status: body.status,
        image: imageUrls,
        fasilitasWisata: {
          deleteMany: {},
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
