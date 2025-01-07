"use client";

import {
  Questa,
  TangoSansBold,
  TangoSans,
  TangoSansBoldItalic,
  TangoSansItalic,
} from "@/app/fonts";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  return (
    <div
      ref={ref}
      className="w-full min-h-screen overflow-hidden relative grid place-items-center"
    >
      
      <div className="flex justify-center items-center flex-col">
        <motion.p
          style={{ y: textY }}
          className={`font-bold text-white text-lg relative z-10 ${Questa.className}`}
        >
          Telusuri Wisata
        </motion.p>

        <motion.h6
          style={{ y: textY }}
          className={`font-bold text-white md:text-6xl sm:text-5xl text-4xl relative z-10 ${Questa.className}`}
        >
         UMKM Suka Marga
        </motion.h6>

        <motion.p
          style={{ y: textY }}
          className={`font-bold text-white text-lg relative z-10 ${Questa.className}`}
        >
          Desa Wisata Alam, Budaya, dan Pertanian yang Berwawasan Lingkungan
        </motion.p>
      </div>


      <motion.div
        className="absolute inset-0 z-0 top-0 grayscale brightness-50"
        style={{
          backgroundImage: `url(/image-full.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />

      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/image-bottom.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
    
  );
}
