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
      <Navbar isLoggedIn={true} />
      <main className="mx-auto px-3 py-12 bg-white">
        {params.slug && <BreadcrumbBlog slug={params.slug} />}
        {/* Detail Blog */}
        <article className="max-w-6xl mx-auto">
          <div className="space-y-6 my-5 flex flex-col items-center justify-center">
            <Badge className="rounded-md bg-orange-secondary/70 text-gray">
              WISATA
            </Badge>
            {/* Judul */}
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

          {/* Gambar Cover */}
          <div className="relative h-[500px] w-auto rounded-lg overflow-auto">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Judul dan Konten */}

          <div className="relative flex flex-col md:flex-row">
            {/* Sticky Bagikan Section */}
            <div className="md:sticky top-12 flex-shrink-0 h-fit">
              <div className="p-3 w-full md:w-36 flex flex-row md:flex-col items-center gap-3">
                <p className=" text-sm mb-2">Bagikan Artikel</p>
                <div className="flex flex-row md:flex-col gap-2">
                  <button className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222c0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4l-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2c0-101.7 82.8-184.5 184.6-184.5c49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18c-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4c-32.6-16.3-54-29.1-75.5-66c-5.7-9.8 5.7-9.1 16.3-30.3c1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5c-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8c35.2 15.2 49 16.5 66.6 13.9c10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"
                      />
                    </svg>
                  </button>
                  <button className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120 82.7 220.8 194.2 248.5V334.2h-52.8V256h52.8v-33.7c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287v175.9C413.8 494.8 512 386.9 512 256"
                      />
                    </svg>
                  </button>
                  <button className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="prose prose-lg text-gray-800 flex-grow my-5">
              {/* Konten */}
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
