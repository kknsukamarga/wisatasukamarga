"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { TangoSansBold } from "@/app/fonts";
import { Dot, Minus } from "lucide-react";

const phrase =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

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
        scrub: true,
        start: `top`,
        end: `+=${window.innerHeight / 1.5}`,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  };

  const splitWords = (phrase: string): JSX.Element[] => {
    const body: JSX.Element[] = [];
    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(
        <p
          className="text-[3.5vw] font-bold m-0 mr-[1.5vw]"
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
      className="flex min-h-screen items-center justify-center bg-gray text-white pb-12 flex-col"
    >
      <h2
        className={`${TangoSansBold.className} flex items-center mx-auto text-2xl text-white text-center`}
      >
        <Minus /> <Dot /> Tentang <Dot /> <Minus />
      </h2>

      <div
        ref={body}
        className="w-[90%] mt-10 flex flex-wrap text-lg leading-[3rem]"
      >
        {splitWords(phrase)}
      </div>
    </main>
  );
}
