"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Columns, Copy, FileBadge, Signature } from "lucide-react";
import { TangoSansBold } from "@/app/fonts";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export function BentoGridBlog({ articles }: { articles: Artikel[] }) {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:mx-5 mt-10 px-2 md:px-0">
      {articles.map((article, i) => (
        <BentoGridItem
          link={`/blog/${article.slug}`}
          key={i}
          title={article.title}
          description={
            <div
              className="text-sm text-gray-600 mt-2 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html:
                  article.content.slice(0, 150) +
                  (article.content.length > 150 ? "..." : ""),
              }}
            />
          } // Potong deskripsi
          header={
            <Image
              src={article.coverImage}
              alt={article.title}
              width={300}
              height={200}
              className="w-full h-full object-cover rounded-xl"
            />
          }
          className={`md:col-span-1 ${
            i === 0 || i === 3 ? "md:col-span-2" : ""
          }`}
          icon={<Copy className="h-4 w-4 text-neutral-500" />} // Gunakan icon default
          author={article.category} // Gunakan category sebagai author
          category={article.category}
          date={new Date(article.updatedAt).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      ))}
    </BentoGrid>
  );
}

interface Artikel {
  title: string;
  coverImage: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

function BentoGridSkeleton() {
  const skeletonItems = Array.from({ length: 4 }); // 4 skeleton items

  return (
    <BentoGrid className="max-w-4xl mx-auto md:mx-5 mt-10 px-2 md:px-0">
      {skeletonItems.map((_, i) => (
        <div
          key={i}
          className={`p-4 bg-white shadow-md min-w-[300px] rounded-lg ${
            i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
          }`}
        >
          <div className="w-full h-[200px] bg-black/10 rounded-xl animate-pulse"></div>
          <div className="mt-4 h-6 w-3/4 bg-black/10 rounded animate-pulse"></div>
          <div className="mt-2 h-4 w-1/2 bg-black/10 rounded animate-pulse"></div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="h-4 w-4 bg-black/10 rounded-full animate-pulse"></div>
            <div className="h-4 w-20 bg-black/10 rounded animate-pulse"></div>
          </div>
          <div className="mt-2 h-4 w-1/3 bg-black/10 rounded animate-pulse"></div>
        </div>
      ))}
    </BentoGrid>
  );
}

function Blog() {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data dari API
    const fetchArtikels = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/blog?mode=all&limit=4"); // Gunakan parameter mode dan limit
        const data = await response.json();

        if (data.articles) {
          setArtikels(data.articles); // Pastikan Anda mengambil `articles` dari response API
        }
      } catch (error) {
        console.error("Gagal mengambil data artikel", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikels();
  }, []);

  return (
    <div
      className="min-h-screen py-24 md:py:12 flex flex-col items-center justify-center"
      id="blog"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
          <Image src="/icon-lake.png" alt="icon-lake" width={32} height={32} />
        </div>

        <h2
          className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-gray text-center`}
        >
          Blog, Artikel, Berita
        </h2>

        <p className="md:w-[50%] w-[90%] mx-auto mt-2">
          Dapatkan informasi terbaru tentang wisata, umkm, dan hal lainnya di
          Desa Suka Marga
        </p>
      </div>

      {/* <BentoGridBlog articles={artikels} /> */}
      {loading ? <BentoGridSkeleton /> : <BentoGridBlog articles={artikels} />}

      <div className="w-full flex justify-center items-center">
        <Link href="/blogs" className="mx-auto">
          <Button className="mt-12">Lihat semua berita dan artikel</Button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
