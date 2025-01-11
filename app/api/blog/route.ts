import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Convert string to Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

  return `${year}-${month}-${day}`;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    if (mode === "single") {
      const slug = searchParams.get("slug");
      if (!slug) {
        return NextResponse.json(
          { error: "Slug is required" },
          { status: 400 }
        );
      }

      const blog = await prisma.blog.findUnique({ where: { slug } });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      const formattedBlog = {
        ...blog,
        updatedAt: formatDate(blog.updatedAt.toISOString()),
      };

      return NextResponse.json(formattedBlog);
    } else if (mode === "all") {
      // Fetch all blogs without pagination
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      });

      const formattedBlogs = blogs.map((blog) => ({
        ...blog,
        updatedAt: formatDate(blog.updatedAt.toISOString()),
      }));

      return NextResponse.json({ articles: formattedBlogs });
    } else {
      // Existing paginated logic
      const blogs = await prisma.blog.findMany({
        take: limit + 1,
        skip: cursor ? 1 : 0,
        ...(cursor && { cursor: { id: cursor } }),
        orderBy: { createdAt: "desc" },
      });

      const hasNextPage = blogs.length > limit;
      const nextCursor = hasNextPage ? blogs[blogs.length - 1].id : null;
      const trimmedBlogs = hasNextPage ? blogs.slice(0, -1) : blogs;

      const formattedBlogs = trimmedBlogs.map((blog) => ({
        ...blog,
        updatedAt: formatDate(blog.updatedAt.toISOString()),
      }));

      const categories = await prisma.blog.groupBy({
        by: ["category"],
      });

      return NextResponse.json({
        articles: formattedBlogs,
        categories: categories.map((cat) => cat.category),
        next_cursor: nextCursor,
      });
    }
  } catch (error) {
    console.error("Error during GET:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch blogs", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch blogs", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const { title, coverImage, content, author, category } = body;

    if (!title || !coverImage || !content || !author || !category) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!["TEMPAT_WISATA", "KARYA_UMKM"].includes(category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    // Upload cover image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(coverImage, {
      folder: "blogs",
      public_id: title.toLowerCase().replace(/\s+/g, "-"),
    });

    const coverImageUrl = cloudinaryResponse.secure_url;

    // Process and upload images in content
    let updatedContent = content;
    const base64Regex = /<img src="(data:image\/.*?;base64,.*?)".*?>/g;
    const matches = [...content.matchAll(base64Regex)];

    for (const match of matches) {
      const base64Image = match[1];

      // Upload each base64 image to Cloudinary
      const imageResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "blogs/content-images",
      });

      const imageUrl = imageResponse.secure_url;

      // Replace base64 string with the Cloudinary URL in content and inject CSS class
      updatedContent = updatedContent.replace(
        match[0],
        `<img src="${imageUrl}" class="img-resize-blog">`
      );
    }

    // Generate slug
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

    // Save to database
    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug,
        coverImage: coverImageUrl,
        content: updatedContent,
        author,
        category,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error adding blog:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to add blog", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add blog", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
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

    const { title, coverImage, content, author, category, deletedImages } =
      body;

    if (!title || !coverImage || !content || !author || !category) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!["TEMPAT_WISATA", "KARYA_UMKM"].includes(category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    // Step 1: Hapus gambar yang tidak lagi digunakan (dari deletedImages)
    if (deletedImages && Array.isArray(deletedImages)) {
      for (const imageUrl of deletedImages) {
        const publicId = imageUrl.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`blogs/content-images/${publicId}`);
        }
      }
    }

    // Step 2: Upload cover image jika diubah
    let imageUrl = existingBlog.coverImage;

    if (
      coverImage !== existingBlog.coverImage &&
      coverImage.startsWith("data:image/")
    ) {
      const publicId = existingBlog.coverImage.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(coverImage, {
        folder: "blogs",
        public_id: title.toLowerCase().replace(/\s+/g, "-"),
      });

      imageUrl = cloudinaryResponse.secure_url;
    }

    // Step 3: Process and upload images in content
    let updatedContent = content;
    const base64Regex = /<img src="(data:image\/.*?;base64,.*?)".*?>/g;
    const matches = [...content.matchAll(base64Regex)];

    for (const match of matches) {
      const base64Image = match[1];

      // Upload each base64 image to Cloudinary
      const imageResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "blogs/content-images",
      });

      const imageUrl = imageResponse.secure_url;

      // Replace base64 string with the Cloudinary URL in content and inject CSS class
      updatedContent = updatedContent.replace(
        match[0],
        `<img src="${imageUrl}" class="img-resize-blog">`
      );
    }

    // Step 4: Generate slug
    let newSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    let existingSlug = await prisma.blog.findUnique({
      where: { slug: newSlug },
    });
    let counter = 1;

    while (existingSlug && existingSlug.id !== existingBlog.id) {
      newSlug = `${newSlug}-${counter}`;
      existingSlug = await prisma.blog.findUnique({ where: { slug: newSlug } });
      counter++;
    }

    // Step 5: Update the blog in the database
    const updatedBlog = await prisma.blog.update({
      where: { slug },
      data: {
        title,
        slug: newSlug,
        coverImage: imageUrl,
        content: updatedContent,
        author,
        category,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update blog", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update blog", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Step 1: Hapus cover image dari Cloudinary
    const publicId = blog.coverImage.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`blogs/${publicId}`);
    }

    // Step 2: Hapus semua gambar yang ada di konten React Quill
    const extractImageUrlsFromContent = (content: string): string[] => {
      const imgRegex = /<img src="([^"]+)"/g;
      let match: RegExpExecArray | null;
      const matches: string[] = [];

      while ((match = imgRegex.exec(content)) !== null) {
        matches.push(match[1]); // Ambil grup pertama (URL gambar)
      }

      return matches;
    };

    const contentImageUrls = extractImageUrlsFromContent(blog.content);

    for (const imageUrl of contentImageUrls) {
      const contentImagePublicId = imageUrl.split("/").pop()?.split(".")[0];
      if (contentImagePublicId) {
        await cloudinary.uploader.destroy(
          `blogs/content-images/${contentImagePublicId}`
        );
      }
    }

    // Step 3: Hapus blog dari database
    await prisma.blog.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete blog", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete blog", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
