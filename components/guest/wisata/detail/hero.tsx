import { Questa } from "@/app/fonts";

import { MapPin, MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

export default function Hero({ data }: { data: any }) {
  return (
    <div className="h-[50vh] md:h-[70vh] xl:h-screen text-white relative">
      <Image
        src={data.imageCover}
        alt="Image 2"
        layout="fill"
        className="absolute inset-0 z-10 brightness-50"
      />

      <div className="h-full flex gap-5 justify-end items-start p-8 md:p-20 flex-col md:w-fit">
        <div className="items-center text-sm gap-2 px-4 py-3 rounded-full bg-white/10 border-white border z-20 text-white hidden md:flex w-full">
          <MapPin /> Sukamarga, Suoh, Lampung Barat
        </div>

        <h1 className={`text-white text-5xl z-20 ${Questa.className}`}>
          {data.name}
        </h1>

        <p className="z-20 text-white">
          {data.price < 100
            ? "Rp Gratis"
            : `Rp${data.price.toLocaleString("id-ID")},00`}
        </p>
      </div>
    </div>
  );
}
