"use client";

import { Questa } from "@/app/fonts";
import { CDN_GITHUB_URL } from "@/lib/utils";

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
      className="w-full min-h-screen overflow-hidden relative grid place-items-center border border-red-500"
    >
      <div className="flex justify-center items-center flex-col z-40 text-center">
        <motion.p
          style={{ y: textY }}
          className={`font-bold text-white text-lg relative z-40 ${Questa.className}`}
        >
          Telusuri Wisata
        </motion.p>

        <motion.h1
          style={{ y: textY }}
          className={`font-bold text-white text-5xl md:text-7xl relative z-40 ${Questa.className}`}
        >
          Wisata Suka Marga
        </motion.h1>
      </div>

      <motion.div
        className="absolute inset-0 z-0 top-0 brightness-50"
        style={{
          backgroundImage: `url(${CDN_GITHUB_URL}parralax/1.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />

      {/* <motion.div
        className="absolute inset-0 z-20 bo"
        style={{
          backgroundImage: `url(${CDN_GITHUB_URL}parralax/1.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      /> */}

      <div className="absolute inset-0 bg-gradient-to-t from-gray to-transparent z-30" />
    </div>
  );
}
