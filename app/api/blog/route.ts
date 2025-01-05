import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type BlogParams = {
  title: string;
  coverImage: string; // Base64 encoded string
  content: string;
  author: string;
  category: "TEMPAT_WISATA" | "KARYA_UMKM"; // Enum category
};

// Handle all HTTP methods
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      // Fetch single blog by slug
      const blog = await prisma.blog.findUnique({
        where: { slug },
      });

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json(blog);
    }

    // Fetch all blogs
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("Error during GET blogs:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body: BlogParams = await req.json();

  try {
    const { title, coverImage, content, author, category } = body;

    // Validate required fields
    if (!title || !coverImage || !content || !author || !category) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Validate category
    if (!["TEMPAT_WISATA", "KARYA_UMKM"].includes(category)) {
      return NextResponse.json(
        { error: "Kategori tidak valid" },
        { status: 400 }
      );
    }

    // Upload Base64 image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(coverImage, {
      folder: "blogs",
      public_id: title.toLowerCase().replace(/\s+/g, "-"),
    });

    const imageUrl = cloudinaryResponse.secure_url;

    // Generate a unique slug
    let slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    let existingSlug = await prisma.blog.findUnique({ where: { slug } });
    let counter = 1;

    while (existingSlug) {
      slug = `${slug}-${counter}`;
      existingSlug = await prisma.blog.findUnique({ where: { slug } });
      counter++;
    }

    // Create a new blog entry
    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug,
        coverImage: imageUrl,
        content,
        author,
        category,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan blog:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan blog. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body: BlogParams = await req.json();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const { title, coverImage, content, author, category } = body;

    // Validate required fields
    if (!title || !coverImage || !content || !author || !category) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Validate category
    if (!["TEMPAT_WISATA", "KARYA_UMKM"].includes(category)) {
      return NextResponse.json(
        { error: "Kategori tidak valid" },
        { status: 400 }
      );
    }

    let imageUrl = existingBlog.coverImage;

    // Check if coverImage is a new Base64 image or an existing URL
    const isBase64 = coverImage.startsWith("data:image/");
    if (isBase64) {
      const cloudinaryResponse = await cloudinary.uploader.upload(coverImage, {
        folder: "blogs",
        public_id: title.toLowerCase().replace(/\s+/g, "-"),
      });

      imageUrl = cloudinaryResponse.secure_url;
    }

    // Update the blog entry
    const updatedBlog = await prisma.blog.update({
      where: { slug },
      data: {
        title,
        coverImage: imageUrl,
        content,
        author,
        category,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await prisma.blog.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
