import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
      <article className="max-w-6xl mx-auto overflow-hidden">
        <div className="space-y-6 my-5 flex flex-col items-center justify-center">
          <Badge className="rounded-md bg-orange-100 text-orange-400">
            WISATA
          </Badge>
          {/* Judul */}
          <h1 className="text-5xl font-bold text-gray-900 text-center">
            {blog.title}
          </h1>
          <p>
            {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Gambar Cover */}
        <div className="relative h-[400px] w-auto rounded-lg overflow-auto">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Judul dan Konten */}
        <div className="relative flex gap-8">
          {/* Sticky Bagikan Section */}
          <div className="sticky top-0 flex-shrink-0">
            <div className="p-4 w-48 shadow-md rounded-md">
              <p className="font-bold text-lg mb-4">Bagikan</p>
              <div className="flex flex-col gap-4">
                <button className="text-green-500 text-2xl">WhatsApp</button>
                <button className="text-blue-600 text-2xl">Facebook</button>
                <button className="text-blue-400 text-2xl">Twitter</button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg text-gray-800 text-xl flex-grow mt-5">
            {/* Konten */}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </article>
    </main>
  );
}
