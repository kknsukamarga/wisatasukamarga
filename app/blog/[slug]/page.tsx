import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

// Fungsi untuk mendapatkan blog berdasarkan slug
async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    return null;
  }

  return {
    ...blog,
    createdAt: blog.createdAt.toISOString(), // Konversi DateTime ke ISO string
    updatedAt: blog.updatedAt?.toISOString(), // Konversi updatedAt jika ada
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound(); // Jika blog tidak ditemukan, tampilkan halaman 404
  }

  return (
    <main className="container mx-auto px-6 py-12">
      {/* Tombol Back */}
      <Link
        href="/blogs"
        className="inline-flex items-center mb-4 text-gray-500 hover:underline"
      >
        ← Back
      </Link>

      {/* Detail Blog */}
      <article className="max-w-4xl mx-auto overflow-hidden">
        {/* Gambar Cover */}
        <div className="relative h-96 w-full overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Judul dan Konten */}
        <div className="p-6">
          {/* Judul */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {blog.title}
          </h1>
          {/* Tanggal (updatedAt) */}
          <p className="text-sm text-gray-500 mb-6">
            {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}{" "}
          </p>
          {/* Konten */}
          <div
            className="prose prose-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </main>
  );
}
