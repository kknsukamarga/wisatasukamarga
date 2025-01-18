"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Komponen Artikel
interface Artikel {
  title: string;
  coverImage: string;
  category: string;
  content: string; // Content dalam format HTML
  createdAt: string;
  updatedAt: string;
  slug: string; // Tambahkan slug untuk navigasi
  view_count: number;
}

const ArtikelSkeleton: React.FC = () => (
  <div className="max-w-screen-lg mx-auto py-10 px-4">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel Terbaru</h1>
    <p className="text-gray-600 mb-8">
      Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan menarik
      seputar topik ini, jangan ragu untuk membaca seluruh artikel yang telah
      kami sajikan secara detail di sini!
    </p>

    <div className="flex flex-col md:flex-row gap-6">
      {/* Skeleton Kiri */}
      <div className="flex-1 p-2 rounded-lg shadow-md overflow-hidden bg-gray-200 animate-pulse">
        <div className="w-full h-[70%] bg-black/10 rounded-2xl p-2 my-2"></div>
        <div className="p-4">
          <div className="h-4 w-32 bg-black/10 rounded-full mb-2"></div>
          <div className="h-3 w-24 bg-black/10 rounded-full mb-2"></div>
          <div className="h-6 w-3/4 bg-black/10 rounded mb-4"></div>
          <div className="h-4 w-full bg-black/10 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-black/10 rounded"></div>
        </div>
      </div>

      {/* Skeleton Kanan */}
      <div className="flex flex-col gap-6 flex-1">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex-1 p-2 rounded-lg shadow-md overflow-hidden bg-gray-200 animate-pulse"
          >
            <div className="w-full h-40 bg-black/10 rounded-2xl p-2 my-2"></div>
            <div className="p-4">
              <div className="h-4 w-32 bg-black/10 rounded-full mb-2"></div>
              <div className="h-3 w-24 bg-black/10 rounded-full mb-2"></div>
              <div className="h-5 w-2/3 bg-black/10 rounded mb-4"></div>
              <div className="h-4 w-full bg-black/10 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-black/10 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const fetchArtikels = async () => {
  const response = await fetch("/api/blog?mode=all&limit=3");

  if (!response.ok) {
    throw new Error("Gagal mengambil data artikel");
  }

  return response.json();
};

const ArtikelTerbaru: React.FC = () => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["artikelTerbaru"],
    queryFn: fetchArtikels,
  });

  if (isLoading) {
    return <ArtikelSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Terjadi kesalahan saat mengambil data artikel.
      </div>
    );
  }

  const artikels: Artikel[] = data?.articles || [];

  return (
    <div className="max-w-screen-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel Terbaru</h1>
      <p className="text-gray-600 mb-8">
        Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan menarik
        seputar topik ini, jangan ragu untuk membaca seluruh artikel yang telah
        kami sajikan secara detail di sini!
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Bagian Kiri */}
        {artikels[0] && (
          <motion.div
            className="flex-1 rounded-lg shadow-md overflow-hidden bg-white justify-between border border-black border-opacity-10 cursor-pointer transition-all duration-200"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(`/blog/${artikels[0].slug}`)}
          >
            <img
              src={artikels[0].coverImage}
              alt={artikels[0].title}
              className="w-full h-[70%] object-cover rounded-2xl p-2 my-2"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold -ml-1 uppercase bg-orange-secondary/80 text-gray px-2 py-1 shadow-md rounded-full">
                  {artikels[0].category.replace("_", " ")}
                </span>

                <p className="text-xs  rounded-md bg-gray px-3 py-1 text-white">
                  Dibaca {artikels[0].view_count}x
                </p>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(artikels[0].updatedAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-2">
                {artikels[0].title}
              </h2>

              <div
                className="text-sm text-gray-600 mt-2"
                dangerouslySetInnerHTML={{
                  __html:
                    artikels[0].content.slice(0, 150) +
                    (artikels[0].content.length > 150 ? "..." : ""),
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Bagian Kanan */}
        <div className="flex flex-col gap-6 flex-1">
          {artikels.slice(1, 3).map((artikel, index) => (
            <motion.div
              key={index}
              className="flex-1 rounded-lg shadow-md overflow-hidden bg-white border border-black border-opacity-10 cursor-pointer transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(`/blog/${artikel.slug}`)}
            >
              <img
                src={artikel.coverImage}
                alt={artikel.title}
                className="w-full h-40 object-cover rounded-2xl p-2 my-2"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold -ml-1 uppercase bg-orange-secondary/80 text-gray rounded-full px-2 py-1 shadow-md">
                    {artikel.category.replace("_", " ")}
                  </span>

                  <p className="text-xs  rounded-md bg-gray px-3 py-1 text-white">
                    Dibaca {artikels[0].view_count}x
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(artikel.updatedAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-lg font-bold text-gray-800 mt-2">
                  {artikel.title}
                </h2>
                <div
                  className="text-sm text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      artikel.content.slice(0, 100) +
                      (artikel.content.length > 100 ? "..." : ""),
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtikelTerbaru;
