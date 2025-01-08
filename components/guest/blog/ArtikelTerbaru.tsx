"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Komponen Artikel
interface Artikel {
  title: string;
  coverImage: string;
  category: string;
  content: string; // Content dalam format HTML
  createdAt: string;
  slug: string; // Tambahkan slug untuk navigasi
}

const ArtikelTerbaru: React.FC = () => {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const router = useRouter(); // Router untuk navigasi

  useEffect(() => {
    // Fetch data dari API
    const fetchArtikels = async () => {
      try {
        const response = await fetch("/api/blog?mode=all&limit=3"); // Gunakan parameter mode dan limit
        const data = await response.json();

        if (data.articles) {
          setArtikels(data.articles); // Pastikan Anda mengambil `articles` dari response API
        }
      } catch (error) {
        console.error("Gagal mengambil data artikel", error);
      }
    };

    fetchArtikels();
  }, []);

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
            className="flex-1 rounded-lg shadow-md overflow-hidden bg-white justify-between border border-black border-opacity-10 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(`/blog/${artikels[0].slug}`)}
          >
            <img
              src={artikels[0].coverImage}
              alt={artikels[0].title}
              className="w-full h-[70%] object-cover rounded-2xl p-2 my-2"
            />
            <div className="p-4">
              <span className="text-sm font-semibold -ml-1 uppercase bg-orange-secondary/80 text-gray rounded-lg px-2 py-1 shadow-md">
                {artikels[0].category.replace("_", " ")}
              </span>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(artikels[0].createdAt).toLocaleDateString("id-ID", {
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
              className="flex-1 rounded-lg shadow-md overflow-hidden bg-white border border-black border-opacity-10 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(`/blog/${artikel.slug}`)}
            >
              <img
                src={artikel.coverImage}
                alt={artikel.title}
                className="w-full h-40 object-cover rounded-2xl p-2 my-2"
              />
              <div className="p-4">
                <span className="text-sm font-semibold -ml-1 uppercase bg-orange-secondary/80 text-gray rounded-lg px-2 py-1 shadow-md">
                  {artikel.category.replace("_", " ")}
                </span>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
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
