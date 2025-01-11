import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/guest/navbar";
import Footer from "@/components/guest/footer";
import { Questa } from "@/app/fonts";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Sharelink from "./sharelink";

function BreadcrumbBlog({ slug }: { slug: string }) {
  return (
    <Breadcrumb className="max-w-6xl mx-auto mt-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/blogs">Artikel</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{slug}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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
    <>
      <Navbar />

      <main className="mx-auto px-3 py-12 bg-white">
        {params.slug && <BreadcrumbBlog slug={params.slug} />}
        <article className="max-w-6xl mx-auto">
          <div className="space-y-6 my-5 flex flex-col items-center justify-center">
            <Badge className="rounded-md bg-orange-secondary/70 text-gray">
              WISATA
            </Badge>
            <h1
              className={`text-5xl font-bold text-gray-900 text-center ${Questa.className}`}
            >
              {blog.title}
            </h1>
            <p className="text-sm">
              {new Date(blog.updatedAt).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="relative h-[500px] w-auto rounded-lg overflow-auto">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="relative flex flex-col-reverse md:flex-row">
            <div className="md:sticky top-16 lg:top-12 flex-shrink-0 h-fit">
              <div className="p-3 w-full md:w-36 flex flex-col items-center gap-3">
                <p className="text-sm mb-2 font-semibold">Bagikan Artikel</p>
                <Sharelink />
              </div>
            </div>
            <div className="prose prose-lg text-gray-800 flex-grow my-5">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="text-justify"
              />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
