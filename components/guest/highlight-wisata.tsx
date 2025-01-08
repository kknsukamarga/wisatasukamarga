"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { TangoSansBold } from "@/app/fonts";
import { Button } from "../ui/button";
import { MountainIcon } from "./navbar";

export interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  icon_url: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  icon: string;
  link: string;
  color: string;
  range: number[];
  targetScale: number;
  progress: MotionValue<number>;
}

const projects: Project[] = [
  {
    title: "Kawah Nirwana",
    description:
      "Kawah Nirwana adalah kaldera yang terletak di Desa Sukamarga, Kecamatan Suoh. Terkenal dengan danau vulkanik kecil berwarna biru muda dan aktivitas vulkanik yang aktif seperti gas belerang dan uap air panas setiap hari.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/pSykaLfhUkRRLXZv8",
    color: "#CFCBBA",
    icon_url: "/icon-lake.png",
  },
  {
    title: "Kawah Keramikan",
    description:
      "Kawah Keramikan menawarkan pemandangan tanah berlapis yang mengkilap akibat pengaruh belerang dan material vulkanik. Mirip lanskap Yellowstone di Amerika Serikat, kawah ini juga memiliki fumarol aktif.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/1LucuFWJaEfEDi9G8",
    color: "#1F3D3B",
    icon_url: "/icon-mountain.png",
  },
  {
    title: "Kawah Merah",
    description:
      "Kawah Merah adalah danau vulkanik kecil yang berwarna merah karena kandungan besi teroksidasi. Kawah ini memiliki aktivitas vulkanik lebih rendah dibandingkan kawah lainnya.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/9PQDxtC2zmJBcFoG7",
    color: "#CFCBBA",
    icon_url: "/icon-mountain.png",
  },
  {
    title: "Danau Asam",
    description:
      "Danau Asam adalah danau dengan air yang memiliki pH rendah karena material vulkanik dari kawah sekitarnya. Terbentuk akibat gempa pada tahun 1933 dengan kekuatan 7.7 Ms.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/EU6ByrZ9hxk2Cqm98",
    color: "#1F3D3B",
    icon_url: "/icon-lake.png",
  },
  {
    title: "Danau Lebar",
    description:
      "Terletak di selatan Danau Asam, Danau Lebar memiliki luas sekitar 0.6 km² dan akses mudah dari Jalan Lintas Suoh. Danau ini memberikan pemandangan indah dan mudah diakses.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/KreKGLuTbJ7qfDtGA",
    color: "#CFCBBA",
    icon_url: "/icon-lake.png",
  },
  {
    title: "Danau Minyak",
    description:
      "Danau Minyak memiliki siluet air yang menyerupai minyak. Tempat ini menjadi favorit kawanan gajah untuk berendam, terutama pada sore hari.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/vrpL4vkTYo3PctK79",
    color: "#1F3D3B",
    icon_url: "/icon-lake.png",
  },
  {
    title: "Pasir Kuning",
    description:
      "Pasir Kuning adalah hamparan pasir vulkanik berwarna kuning dengan luas 52.000 m². Warna kuning berasal dari kuarsa dan sulfur dari Kawah Keramikan dan Kawah Nirwana.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/YZVHy2yE8dTVe6Yz9",
    color: "#CFCBBA",
    icon_url: "/icon-mountain.png",
  },
  {
    title: "Air Terjun Cibatuan",
    description:
      "Air Terjun Cibatuan menawarkan lanskap alam yang indah dengan hamparan pasir kuning dan panorama air terjun alami yang memukau.",
    src: "https://picsum.photos/200/300",
    link: "/wisata/air-terjun-cibatuan",
    color: "#1F3D3B",
    icon_url: "/icon-waterfall.png",
  },
];

const Card = ({
  i,
  title,
  description,
  src,
  link,
  color,
  icon,
  range,
  targetScale,
  progress,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Reduced zoom-out effect for image scale
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]); // Smaller zoom-out range
  const scale = useTransform(progress, range, [1, targetScale]); // Smoother stacking effect

  // Determine text color based on background color
  const textColor = color === "#1F3D3B" ? "text-white" : "text-black";

  return (
    <div
      ref={container}
      className="cardContainer h-[70svh] flex items-center justify-center sticky top-0"
    >
      <motion.div
        className="card flex flex-col relative w-[1000px] rounded-3xl p-12"
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-3vh + ${i * 15}px)`,
        }}
      >
        <div className="flex flex-col-reverse md:flex-row h-full gap-12">
          <div
            className={`desc w-full justify-around md:w-[40%] relative flex flex-col gap-4 ${textColor}`}
          >
            <div className="p-2 rounded-full bg-orange-primary z-20 w-fit">
              <Image src={icon} alt="icon-lake" width={32} height={32} />
            </div>

            <h2 className={`m-0 text-xl ${TangoSansBold.className}`}>
              {title}
            </h2>

            <p className="text-base first-letter:text-2xl">{description}</p>

            <span>
              <Link href={link} target="_blank">
                <Button
                  className={`text-xs flex items-center gap-1 cursor-pointer ${
                    color === "#1F3D3B"
                      ? "bg-white hover:bg-white/90 text-gray"
                      : "bg-gray hover:bg-gray/90"
                  }`}
                >
                  <span>See more</span>
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </Link>
            </span>
          </div>

          <div className="imgContainer relative w-full md:w-[60%] rounded-xl md:rounded-3xl overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <Image fill src={`${src}`} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HighlightWisata: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div
      id="highlight-wisata"
      className="py-24 bg-contain bg-center"
      style={{ backgroundImage: "url('/leaf-pattern-contrast.png')" }}
      ref={container}
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
          <Image src="/icon-lake.png" alt="icon-lake" width={32} height={32} />
        </div>

        <h2
          className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-gray text-center`}
        >
          Spot Wisata Suka Marga
        </h2>

        <p className="md:w-[50%] w-[90%] mx-auto mt-2">
          Spot Wisata Suka Marga menawarkan keindahan alam yang memukau dengan
          hamparan perbukitan hijau dan udara sejuk yang menyegarkan.
        </p>
      </div>

      <div className="relative">
        {projects.map((project, index) => {
          const targetScale = 1 - (projects.length - index) * 0.015;

          return (
            <Card
              key={index}
              icon={project.icon_url}
              i={index}
              {...project}
              progress={scrollYProgress}
              range={[index * 0.15, index * 0.2 + 0.7]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      <div className="w-full flex justify-center items-center">
        <Link href="/wisata" className="mx-auto">
          <Button className="mt-12">Lihat semua wisata</Button>
        </Link>
      </div>
    </div>
  );
};

export default HighlightWisata;
