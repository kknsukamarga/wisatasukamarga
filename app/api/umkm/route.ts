import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";

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
  owner: string;
  category?: "service" | "product";
};

// Handle semua metode HTTP
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const page = searchParams.get("page");
  const pageSize: any = searchParams.get("pagesize");
  const search = searchParams.get("search");
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

    if (page) {
      if (search) {
        const umkmsSearchCount = await prisma.umkm.count({
          where: {
            OR: [
              { product_name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { wanumber: { contains: search, mode: "insensitive" } },
              { owner: { contains: search, mode: "insensitive" } },
            ],
          },
        });

        const umkmsSearchPaginate = await prisma.umkm.findMany({
          skip: (parseInt(page) - 1) * (parseInt(pageSize) || 10),
          take: parseInt(pageSize) || 10,
          where: {
            OR: [
              { product_name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { wanumber: { contains: search, mode: "insensitive" } },
              { owner: { contains: search, mode: "insensitive" } },
            ],
          },
        });

        if (!umkmsSearchPaginate) {
          return NextResponse.json(
            { error: "UMKM tidak ditemukan" },
            { status: 404 }
          );
        }
        const data = { umkm: umkmsSearchPaginate, length: umkmsSearchCount };
        return NextResponse.json(data);
      }

      const umkmsPage = await prisma.umkm.findMany({
        skip: (parseInt(page) - 1) * (parseInt(pageSize) || 10),
        take: parseInt(pageSize) || 10,
      });

      if (!umkmsPage) {
        return NextResponse.json(
          { error: "UMKM tidak ditemukan" },
          { status: 404 }
        );
      }
      const totalCount = await prisma.umkm.count();
      const data = { umkm: umkmsPage, length: totalCount };
      return NextResponse.json(data);
    }

    let umkms = await prisma.umkm.findMany();
    // Ambil semua data UMKM
    return NextResponse.json(umkms);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server", details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: "Anda harus login terlebih dahulu" },
      { status: 401 }
    );
  }

  const body = await req.json();
  try {
    const {
      product_name,
      images,
      price,
      description,
      wanumber,
      owner,
      category,
    } = body;

    // Validate required fields
    if (
      !product_name ||
      !images ||
      images.length === 0 ||
      !price ||
      !description ||
      !wanumber ||
      !owner ||
      !category
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
        owner,
        category,
      },
    });

    return NextResponse.json(newUmkm, { status: 201 });
  } catch (error: any) {
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
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: "Anda harus login terlebih dahulu" },
      { status: 401 }
    );
  }

  try {
    if (!slug) {
      return NextResponse.json(
        { error: "Slug wajib disertakan" },
        { status: 400 }
      );
    }

    const {
      product_name,
      image,
      price,
      description,
      wanumber,
      owner,
      category,
    } = body;
    // Fetch existing UMKM entry
    const existingUmkm = await prisma.umkm.findUnique({ where: { slug } });
    if (!existingUmkm) {
      return NextResponse.json(
        { error: "UMKM tidak ditemukan" },
        { status: 404 }
      );
    }

    await Promise.all(
      existingUmkm.image.map(async (imageUrl: any) => {
        const publicId = "umkm/" + imageUrl.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      })
    );

    // Generate a new slug based on updated product_name
    let newSlug = product_name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    let existingSlug = await prisma.umkm.findUnique({
      where: { slug: newSlug },
    });
    let counter = 1;

    while (existingSlug && existingSlug.slug !== existingUmkm.slug) {
      newSlug = `${newSlug}-${counter}`;
      existingSlug = await prisma.umkm.findUnique({ where: { slug: newSlug } });
      counter++;
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
      slug: newSlug,
      image: updatedImageUrl,
      price: price || existingUmkm.price,
      description: description || existingUmkm.description,
      wanumber: wanumber || existingUmkm.wanumber,
      owner: owner || existingUmkm.owner,
      category: category || existingUmkm.category,
    };

    // Update the UMKM entry in the database
    const updatedUmkm = await prisma.umkm.update({
      where: { slug },
      data: updatedData,
    });

    return NextResponse.json(updatedUmkm, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui UMKM", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const formData = await req.formData();
  const slugsString = formData.get("slugs") as string;
  const slug = formData.get("slug") as string;
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: "Anda harus login terlebih dahulu" },
      { status: 401 }
    );
  }

  try {
    if (slug) {
      const umkm = await prisma.umkm.findUnique({ where: { slug } });

      if (!umkm) {
        return NextResponse.json({ error: "Tidak ada data umkm" });
      }

      if (umkm.image.length > 0) {
        await Promise.all(
          umkm.image.map(async (imageUrl: any) => {
            const publicId = "umkm/" + imageUrl.split("/").pop()?.split(".")[0];
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          })
        );
      }

      // Handle single slug deletion
      await prisma.umkm.delete({
        where: { slug },
      });

      return NextResponse.json(
        { message: "UMKM berhasil dihapus" },
        { status: 200 }
      );
    } else if (slugsString) {
      // Handle multiple slugs deletion
      const slugs = JSON.parse(slugsString); // Parse JSON string to array

      if (!Array.isArray(slugs) || slugs.length === 0) {
        return NextResponse.json(
          { error: "Daftar slug tidak valid atau kosong" },
          { status: 400 }
        );
      }

      const umkms = await prisma.umkm.findMany({
        where: { slug: { in: slugs } },
      });

      if (umkms.length !== slugs.length) {
        return NextResponse.json(
          { error: "Tidak ada data umkm" },
          { status: 404 }
        );
      }

      umkms.forEach((umkm) => {
        if (umkm.image.length > 0) {
          umkm.image.forEach(async (imageUrl: any) => {
            const publicId = "umkm/" + imageUrl.split("/").pop()?.split(".")[0];
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          });
        }
      });

      await prisma.umkm.deleteMany({
        where: { slug: { in: slugs } },
      });

      return NextResponse.json(
        { message: "UMKM berhasil dihapus" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Slug atau daftar slug wajib disertakan" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus UMKM", details: error.message },
      { status: 500 }
    );
  }
}
