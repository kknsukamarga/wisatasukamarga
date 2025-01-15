"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CarouselAttractions({ attractions }) {
  const [activeItem, setActiveItem] = useState(0);
  const wrapperRef = useRef<HTMLUListElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    );

    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[320px] md:w-[700px] lg:w-[1400px] max-w-full">
        <p className="mb-5 text-center md:hidden mt-10">
          Scroll ke kanan untuk melihat lebih banyak
        </p>

        <ul
          ref={wrapperRef}
          className="group flex justify-start md:w-full md:animate-none overflow-scroll md:overflow-hidden gap-5 h-[400px] md:flex-row md:gap-[1.5%] mt-10 md:mt-0"
        >
          {attractions.map((item, index) => (
            <li
              onClick={() => setActiveItem(index)}
              aria-current={activeItem === index}
              className={cn(
                "relative cursor-pointer md:w-[8%] md:[&[aria-current='true']]:w-[48%]",
                "md:[transition:width_var(--transition,200ms_ease-in)]",
                "md:before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white",
                "md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] md:hover:w-[12%]"
              )}
              key={item.name}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  className="absolute object-cover w-full -translate-y-1/2 opacity-80 z-10 top-1/2 max-w-none md:left-1/2 md:h-full md:-translate-x-1/2 md:rounded-none h-full brightness-75"
                  src={item.image}
                  alt={item.name}
                  width={600}
                  height={700}
                  priority
                  quality={100}
                />

                <div
                  className={cn(
                    "inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity",
                    activeItem === index ? "md:opacity-25" : "md:opacity-0"
                  )}
                />

                <div
                  className={cn(
                    "w-[300px] md:w-full top-8 p-4 transition-[transform,opacity] md:absolute md:p-0 flex justify-center md:justify-start pl-0 md:pl-4 xl:pl-8 z-20",
                    activeItem === index
                      ? "md:translate-x-0 md:opacity-100"
                      : "md:translate-x-4 md:opacity-0"
                  )}
                >
                  <p className="text-2xl font-extrabold md:text-4xl z-20 text-white">
                    {item.name}
                  </p>
                </div>

                {/* <div
                  className={cn(
                    "md:left-4 xl:left-8 bottom-2 md:bottom-[15%] w-full p-4 transition-[transform,opacity] absolute md:p-0 z-20",
                    activeItem === index
                      ? "md:translate-x-0 md:opacity-100"
                      : "md:translate-x-4 md:opacity-0"
                  )}
                >
                  <p className="text-[10px] w-[60%] md:w-[80%] font-bold text-gray md:text-xl z-20">
                    <Link
                      href={`projects/${item.name.toLowerCase()}`}
                      className="flex items-center gap-2 text-[10px] md:text-sm"
                    >
                      <ExternalLink /> {item.name} Detail
                    </Link>
                  </p>
                </div> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
