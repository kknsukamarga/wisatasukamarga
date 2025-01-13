"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import BackgroundImage from "./backgroundImage";
import SlideInfo from "./slideinfo";
import Slides from "./slides";
import Controls from "./controls";
import { CDN_GITHUB_URL } from "@/lib/utils";

export type DataShowcase = {
  img: string;
  title: string;
  description: string;
  location: string;
  slug: string;
};

export type CurrentSlide = {
  data: DataShowcase;
  index: number;
};

export default function ShowcaseWisata() {
  const [data, setData] = useState<DataShowcase[]>(ShowcaseSliderData.slice(1));
  const [transitionData, setTransitionData] = useState<DataShowcase>(
    ShowcaseSliderData[0]
  );
  const [currentSlide, setCurrentSlide] = useState<CurrentSlide>({
    data: initiData,
    index: 0,
  });

  return (
    <main
      className={`relative min-h-screen select-none overflow-hidden text-white antialiased`}
    >
      <AnimatePresence>
        <BackgroundImage
          transitionData={transitionData}
          currentSlide={currentSlide}
        />
        <div className="absolute z-20 h-full w-full">
          <div className="flex h-full w-full grid-cols-10 flex-col md:grid">
            {/* Left Content */}
            <div className="col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
              <SlideInfo
                transitionData={transitionData}
                currentSlide={currentSlide}
              />
            </div>

            {/* Slider Right Carousel Content */}
            <div className="col-span-6 flex flex-1 md:justify-center justify-start md:p-10 flex-col h-full">
              <Slides datas={data} />
              <Controls
                currentSlideData={currentSlide}
                data={data}
                transitionData={transitionData}
                initData={initiData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlide}
                sliderData={ShowcaseSliderData}
              />
            </div>
          </div>
        </div>
      </AnimatePresence>
    </main>
  );
}

const ShowcaseSliderData = [
  {
    img: `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-1.JPG`,
    title: "Danau Asam",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "danau-asam",
  },
  {
    img: `${CDN_GITHUB_URL}wisata/image/KAWAH-KRAMIKAN.JPG`,
    title: "Kawah Keramikan",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "nirwana-keramikan",
  },
  {
    img: "https://picsum.photos/id/3/200/300",
    title: "Danau Lebar",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "danau-lebar",
  },
  {
    img: "https://picsum.photos/id/4/200/300",
    title: "Kawah Merah",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "kawah-merah",
  },
  {
    img: "https://picsum.photos/id/5/200/300",
    title: "Danau Minyak",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "danau-minyak",
  },
  {
    img: "https://picsum.photos/id/6/200/300",
    title: "Part of Danau Asam",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "part-of-danau-asam",
  },
  {
    img: "https://picsum.photos/id/7/200/300",
    title: "Air Terjun Cibatuan",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "air-terjun-cibatuan",
  },
  {
    img: "https://picsum.photos/id/8/200/300",
    title: "Kawah Nirwana",
    description: "Wisata Alam yang sangat indah dan menyejukkan",
    location: "Suka Marga, Suoh",
    slug: "kawah-nirwana",
  },
];

const initiData = ShowcaseSliderData[0];
