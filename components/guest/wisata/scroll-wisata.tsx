"use client";

import Image from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { Questa } from "@/app/fonts";
import Link from "next/link";
import { MapPin, MoveRight } from "lucide-react";

export default function ScrollWisata(): JSX.Element {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup
  }, []);

  return (
    <main ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen text-white"
    >
      <Image
        src={"/wisata/kawah-nirwana.png"}
        alt="Image 2"
        layout="fill"
        className="absolute inset-0 z-10 brightness-50"
      />

      <div className="w-full h-full flex gap-5 justify-end items-start p-8 md:p-20 flex-col md:w-[50%]">
        <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 border-white border z-20 text-white">
          <MapPin /> Sukamarga, Lampung Barat
        </div>
        <h1 className={`text-white text-5xl z-20 ${Questa.className}`}>
          Kawah Nirwana
        </h1>

        <p className="z-20 text-white md:max-w-[70%] w-full">
          Wisata Keramikan Suoh ini mulai dibuka sekitar tahun 2004 dan mulai
          dikenal tahun 2006, letaknya berada di kaki Bukit Gunung Ratu,
          tepatnya berdekatan dengan Danau Minyak dan Danau Asam.
        </p>

        <Link
          href={"/wisata/detail"}
          className="bg-white/10 border-white border z-20 text-white px-4 py-2 rounded-sm flex items-center gap-4"
        >
          Buka Detail <MoveRight />
        </Link>
      </div>
    </motion.div>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen text-white"
    >
      <Image
        src={"/wisata/kawah-nirwana.png"}
        alt="Image 2"
        layout="fill"
        className="absolute inset-0 z-10 brightness-50"
      />

      <div className="w-full h-full flex gap-5 justify-end items-start p-8 md:p-20 flex-col md:w-[50%]">
        <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 border-white border z-20 text-white">
          <MapPin /> Sukamarga, Lampung Barat
        </div>
        <h1 className={`text-white text-5xl z-20 ${Questa.className}`}>
          Kawah Nirwana
        </h1>

        <p className="z-20 text-white md:max-w-[70%] w-full">
          Wisata Keramikan Suoh ini mulai dibuka sekitar tahun 2004 dan mulai
          dikenal tahun 2006, letaknya berada di kaki Bukit Gunung Ratu,
          tepatnya berdekatan dengan Danau Minyak dan Danau Asam.
        </p>

        <Link
          href={"/wisata/detail"}
          className="bg-white/10 border-white border z-20 text-white px-4 py-2 rounded-sm flex items-center gap-4"
        >
          Buka Detail <MoveRight />
        </Link>
      </div>
    </motion.div>
  );
};
