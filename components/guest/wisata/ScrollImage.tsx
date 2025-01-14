"use client";

import { Questa } from "@/app/fonts";
import { CDN_GITHUB_URL } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";

import Image from "next/image";
import { useEffect, useRef } from "react";

type SlideProps = {
  images: string[]; // Array gambar untuk satu slide
  direction: "left" | "right";
  left: string;
  progress: any;
};

export default function ScrollMultipleImages() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="overflow-hidden relative min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center z-[70] flex-col text-center -translate-y-10 md:-translate-y-20 shadow-md px-1 md:px-0">
        <p className="text-[#ffffff] lg:text-xl px-4 py-1 bg-gray">
          Detail Wisata
        </p>
        <h1
          className={`text-6xl md:text-8xl text-[#ffffff] px-4 pt-2 pb-4 rounded-md font-bold ${Questa.className}`}
        >
          Desa Suka Marga
        </h1>

        <p className="text-[#ffffff] px-4 py-1 xl:text-lg text-center bg-gray">
          Desa Wisata Alam, Budaya, dan Pertanian
          <br />
          yang Terbungkus Lingkungan yang Asri
        </p>
      </div>

      <div ref={container} className="brightness-75 mix-blend-darken">
        <Slide
          images={[
            `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-1.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-2.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-LEBAR.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-MINYAK.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-KRAMIKAN.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-MERAH-SS.jpg`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-NIRWANA.JPG`,
            `${CDN_GITHUB_URL}wisata/image/PASIR-KUNING-BLUR.JPG`,
          ]}
          direction={"left"}
          left={"-50%"}
          progress={scrollYProgress}
        />
        <Slide
          images={[
            `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-1.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-KRAMIKAN.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-MERAH-SS.jpg`,
            `${CDN_GITHUB_URL}wisata/image/PASIR-KUNING-BLUR.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-MINYAK.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-NIRWANA.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-2.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-LEBAR.JPG`,
          ]}
          direction={"right"}
          left={"-40%"}
          progress={scrollYProgress}
        />
        <Slide
          images={[
            `${CDN_GITHUB_URL}wisata/image/DANAU-MINYAK.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-KRAMIKAN.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-2.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-NIRWANA.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-LEBAR.JPG`,
            `${CDN_GITHUB_URL}wisata/image/KAWAH-MERAH-SS.jpg`,
            `${CDN_GITHUB_URL}wisata/image/PASIR-KUNING-BLUR.JPG`,
            `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-1.JPG`,
          ]}
          direction={"left"}
          left={"-30%"}
          progress={scrollYProgress}
        />
      </div>
    </main>
  );
}

const Slide: React.FC<SlideProps> = ({ images, direction, left, progress }) => {
  const translateDirection = direction === "left" ? -1 : 1;
  const translateX = useTransform(
    progress,
    [0, 1],
    [150 * translateDirection, -150 * translateDirection]
  );

  return (
    <motion.div
      style={{ x: translateX, left }}
      className="relative flex gap-5 whitespace-nowrap"
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="relative h-[70vw] w-[40vw] md:h-[40vw] md:w-[50vw] xl:h-[20vw] xl:w-[30vw] aspect-video rounded-md overflow-hidden my-2 flex-shrink-0"
        >
          <Image
            style={{ objectFit: "cover" }}
            src={src}
            alt={`image-${index}`}
            fill
          />
        </div>
      ))}
    </motion.div>
  );
};
