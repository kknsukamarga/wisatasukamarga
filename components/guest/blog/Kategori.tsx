"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Kategori = () => {
  const router = useRouter(); // Use Next.js router for navigation

  return (
    <div className="bg-orange-400 w-full">
      <div className="p-8 flex flex-col items-center md:flex-row justify-between container mx-auto gap-1">
        <div>
          <h1 className="text-2xl font-bold text-center md:text-left">
            Telusuri Kategori Artikel
          </h1>
          <p>Baca artikel disini</p>
        </div>
        <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
          {/* Wisata Card */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dflmvraib/image/upload/v1736183707/blogs/maling-tertangkap-kering.jpg"
              }
              width={300}
              height={300}
              className="w-full h-72 object-cover rounded-lg"
              alt="WISATA"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl bg-black/50 rounded-lg">
              TEMPAT WISATA
            </p>
          </motion.div>

          {/* UMKM Card */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dflmvraib/image/upload/v1736183707/blogs/maling-tertangkap-kering.jpg"
              }
              width={300}
              height={300}
              className="w-full h-72 object-cover rounded-lg"
              alt="UMKM"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl bg-black/50 rounded-lg">
              KARYA UMKM
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Kategori;
