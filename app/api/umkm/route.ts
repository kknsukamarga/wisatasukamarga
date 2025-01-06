import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UMKMParams = {
  product_name: string;
  image: string[]; // Base64 encoded string
  price: number;
  description: string;
  wanumber: string;
};

// Handle semua metode HTTP
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      // Ambil UMKM berdasarkan slug
      const umkm = await prisma.umkm.findUnique({
        where: { slug },
      });

      if (!umkm) {
        return NextResponse.json(
          { error: "UMKM tidak ditemukan" },
          { status: 404 }
        );
      }

      return NextResponse.json(umkm);
    }

    // Ambil semua data UMKM
    const umkms = await prisma.umkm.findMany();
    return NextResponse.json(umkms);
  } catch (error: any) {
    console.error("Terjadi kesalahan saat mengambil data UMKM:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server", details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { product_name, images, price, description, wanumber } = body;

    // Validate required fields
    if (
      !product_name ||
      !images ||
      images.length === 0 ||
      !price ||
      !description ||
      !wanumber
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Upload all Base64 images to Cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image: any, index: any) => {
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "umkm",
          public_id: `${product_name.toLowerCase().replace(/\s+/g, "-")}-${
            index + 1
          }`,
        });
        return cloudinaryResponse.secure_url; // Return the secure URL
      })
    );

    // Generate a unique slug
    let slug = product_name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    let existingSlug = await prisma.umkm.findUnique({ where: { slug } });
    let counter = 1;

    while (existingSlug) {
      slug = `${slug}-${counter}`;
      existingSlug = await prisma.umkm.findUnique({ where: { slug } });
      counter++;
    }

    // Save the UMKM data to the database
    const newUmkm = await prisma.umkm.create({
      data: {
        product_name,
        slug,
        image: uploadedImages,
        price,
        description,
        wanumber,
      },
    });

    return NextResponse.json(newUmkm, { status: 201 });
  } catch (error: any) {
    console.error("Terjadi kesalahan saat menambahkan UMKM:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan UMKM", details: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (!slug) {
      return NextResponse.json(
        { error: "Slug wajib disertakan" },
        { status: 400 }
      );
    }

    const { product_name, image, price, description, wanumber } = body;
    // Fetch existing UMKM entry
    const existingUmkm = await prisma.umkm.findUnique({ where: { slug } });
    if (!existingUmkm) {
      return NextResponse.json(
        { error: "UMKM tidak ditemukan" },
        { status: 404 }
      );
    }

    const updatedImageUrl = await Promise.all(
      image.map(async (image: any, index: any) => {
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "umkm",
          public_id: `${product_name.toLowerCase().replace(/\s+/g, "-")}-${
            index + 1
          }`,
        });
        return cloudinaryResponse.secure_url;
      })
    );

    const updatedData = {
      product_name: product_name || existingUmkm.product_name,
      image: updatedImageUrl,
      price: price || existingUmkm.price,
      description: description || existingUmkm.description,
      wanumber: wanumber || existingUmkm.wanumber,
    };

    // Update the UMKM entry in the database
    const updatedUmkm = await prisma.umkm.update({
      where: { slug },
      data: updatedData,
    });

    return NextResponse.json(updatedUmkm, { status: 200 });
  } catch (error: any) {
    console.error("Terjadi kesalahan saat memperbarui UMKM:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui UMKM", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (!slug) {
      return NextResponse.json(
        { error: "Slug wajib disertakan" },
        { status: 400 }
      );
    }

    await prisma.umkm.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "UMKM berhasil dihapus" });
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus UMKM:", error);
    return NextResponse.json(
      { error: "Gagal menghapus UMKM" },
      { status: 500 }
    );
  }
}
