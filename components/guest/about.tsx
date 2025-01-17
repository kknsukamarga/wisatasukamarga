"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { TangoSansBold } from "@/app/fonts";
import Image from "next/image";
import { motion } from "framer-motion";

const phrase =
  "Mari berkenalan dengan Desa Sukamarga!. Desa wisata pekon sukamarga adalah desa yang mempunyai aneka ragam destinasi wisata alamnya dan kaya akan keindahannya, diantaranya terdapat ribuan kawah yang berwarna yang disitu terdapat kawah keramikan, kawah nirwana, kawah hitam, kawah merah, 4 danau Padang Savana, hamparan pasir kuning. Air terjun dll. desa ini berjarak 40km dari kantor Pemda Lampung Barat dan dapat di tempuh selama 2 jam dari Liwa ibukota Lampung barat. Desa wisata pekon sukamarga adalah desa yang di kelilingi oleh hutan taman nasional yang Sehingga kesejukanya dan kelestarian nya harus selalu terjaga dengan baik.";

export default function About(): JSX.Element {
  const refs = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = (): void => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: 0.5, // Reduced scrub value for faster animation
        start: `top`,
        end: `+=${window.innerHeight / 5}`,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.05, // Reduced stagger value for faster animation
    });
  };

  const splitWords = (phrase: string): JSX.Element[] => {
    const body: JSX.Element[] = [];
    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(
        <p
          className="text-[4vw] md:text-[2vw] text-center m-0 mr-[0.5vw]"
          key={`${word}_${i}`}
        >
          {letters}
        </p>
      );
    });
    return body;
  };

  const splitLetters = (word: string): JSX.Element[] => {
    const letters: JSX.Element[] = [];
    word.split("").forEach((letter, i) => {
      letters.push(
        <span
          className="opacity-20"
          key={`${letter}_${i}`}
          ref={(el) => {
            if (el) refs.current.push(el);
          }}
        >
          {letter}
        </span>
      );
    });
    return letters;
  };

  return (
    <main
      ref={container}
      className="flex min-h-screen items-center justify-center bg-gray text-white flex-col relative"
    >
      <div className="p-2 rounded-full bg-orange-primary z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M12 9h.01" />
          <path d="M11 12h1v4h1" />
        </svg>
      </div>

      <h2
        className={`${TangoSansBold.className} mx-auto text-2xl text-white text-center gap-2 mt-5`}
      >
        Tak Kenal,
        <br />
        Maka Tak <span className="bg-orange-primary px-4 py-1">Kagum</span>
      </h2>

      <div
        ref={body}
        className="md:w-[70%] w-full px-2 md:px-0 mx-auto mt-5 flex flex-wrap text-lg leading-[1.3rem] md:leading-[2rem] justify-center items-center"
      >
        {splitWords(phrase)}
      </div>
    </main>
  );
}
