"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { TangoSansBold } from "@/app/fonts";
import { Button } from "../ui/button";

export interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
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
    color: "#A2D9CE", // Soft mint green
  },
  {
    title: "Kawah Keramikan",
    description:
      "Kawah Keramikan menawarkan pemandangan tanah berlapis yang mengkilap akibat pengaruh belerang dan material vulkanik. Mirip lanskap Yellowstone di Amerika Serikat, kawah ini juga memiliki fumarol aktif.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/1LucuFWJaEfEDi9G8",
    color: "#FDEBD0", // Soft pastel yellow
  },
  {
    title: "Kawah Merah",
    description:
      "Kawah Merah adalah danau vulkanik kecil yang berwarna merah karena kandungan besi teroksidasi. Kawah ini memiliki aktivitas vulkanik lebih rendah dibandingkan kawah lainnya.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/9PQDxtC2zmJBcFoG7",
    color: "#F5B7B1", // Light coral pink
  },
  {
    title: "Danau Asam",
    description:
      "Danau Asam adalah danau dengan air yang memiliki pH rendah karena material vulkanik dari kawah sekitarnya. Terbentuk akibat gempa pada tahun 1933 dengan kekuatan 7.7 Ms.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/EU6ByrZ9hxk2Cqm98",
    color: "#AED6F1", // Soft baby blue
  },
  {
    title: "Danau Lebar",
    description:
      "Terletak di selatan Danau Asam, Danau Lebar memiliki luas sekitar 0.6 km² dan akses mudah dari Jalan Lintas Suoh. Danau ini memberikan pemandangan indah dan mudah diakses.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/KreKGLuTbJ7qfDtGA",
    color: "#ABEBC6", // Soft green
  },
  {
    title: "Danau Minyak",
    description:
      "Danau Minyak memiliki siluet air yang menyerupai minyak. Tempat ini menjadi favorit kawanan gajah untuk berendam, terutama pada sore hari.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/vrpL4vkTYo3PctK79",
    color: "#FAD7A0", // Pastel orange
  },
  {
    title: "Pasir Kuning",
    description:
      "Pasir Kuning adalah hamparan pasir vulkanik berwarna kuning dengan luas 52.000 m². Warna kuning berasal dari kuarsa dan sulfur dari Kawah Keramikan dan Kawah Nirwana.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/YZVHy2yE8dTVe6Yz9",
    color: "#F9E79F", // Light buttery yellow
  },
  {
    title: "Air Terjun Cibatuan",
    description:
      "Air Terjun Cibatuan menawarkan lanskap alam yang indah dengan hamparan pasir kuning dan panorama air terjun alami yang memukau.",
    src: "https://picsum.photos/200/300",
    link: "https://maps.app.goo.gl/kcuX9Tyy46tCuDsQ9",
    color: "#D6EAF8", // Soft sky blue
  },
];

const Card = ({
  i,
  title,
  description,
  src,
  link,
  color,
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

  return (
    <div
      ref={container}
      className="cardContainer h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        className="card flex flex-col relative h-[500px] w-[1000px] rounded-3xl p-12"
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-3vh + ${i * 15}px)`,
        }}
      >
        <h2 className={`text-center m-0 text-xl ${TangoSansBold.className}`}>
          {title}
        </h2>

        <div className="flex flex-col-reverse md:flex-row h-full mt-2 md:mt-12 gap-12">
          <div className="desc w-full md:w-[40%] relative md:top-[10%] flex flex-col gap-4">
            <p className="text-base first-letter:text-2xl">{description}</p>

            <span>
              <Link href={link} target="_blank">
                <Button className="text-xs flex items-center gap-1 cursor-pointer">
                  See more
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                      fill="#CFCBBA"
                    />
                  </svg>
                </Button>
              </Link>
            </span>
          </div>

          <div className="imgContainer relative w-full md:w-[60%] h-full rounded-3xl overflow-hidden">
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
    <div id="highlight-wisata" className="py-24">
      <h2
        className={`${TangoSansBold.className} text-2xl text-green text-center`}
      >
        Spot Wisata Suka Marga
      </h2>

      <div className="relative">
        {projects.map((project, index) => {
          const targetScale = 1 - (projects.length - index) * 0.015;

          return (
            <Card
              key={index}
              i={index}
              {...project}
              progress={scrollYProgress}
              range={[index * 0.15, index * 0.2 + 0.7]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HighlightWisata;
