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
      className="w-full h-[40vh] md:h-[90vh] lg:h-screen overflow-hidden relative grid place-items-center"
    >
      <motion.div
        className="absolute inset-0 z-0 top-0 grayscale brightness-50"
        style={{
          backgroundImage: `url(${CDN_GITHUB_URL}og-image/umkm.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />

      {/* <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/image-bottom.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      /> */}

      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-30" />
    </div>
  );
}
