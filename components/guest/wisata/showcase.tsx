"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundImage from "./backgroundImage";
import SlideInfo from "./slideinfo";
import Slides from "./slides";
import Controls from "./controls";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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

const SkeletonLarge = () => {
  return (
    <div className="relative w-full h-[70vh] bg-gray-300 animate-pulse">
      <div className="w-full h-full bg-gray-400"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-start space-y-4 px-5">
        <div className="w-[60%] h-10 bg-black/10 rounded-md"></div>
        <div className="w-[80%] h-6 bg-black/10 rounded-md"></div>
        <div className="w-[70%] h-6 bg-black/10 rounded-md"></div>
        <div className="mt-5 w-32 h-10 bg-black/10 rounded-full"></div>
      </div>
    </div>
  );
};

const SkeletonCarousel = () => {
  return (
    <div className="flex space-x-4 mt-8">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[120px] bg-black/20 rounded-md animate-pulse"
          >
            <div className="w-full h-full bg-black/10"></div>
            <div className="mt-2 w-3/4 h-4 bg-black/10 rounded-md"></div>
          </div>
        ))}
    </div>
  );
};

export default function ShowcaseWisata() {
  const {
    data: fetchedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wisata"],
    queryFn: async () => {
      const response = await fetch("/api/wisata");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });

  const [data, setData] = useState<DataShowcase[]>([]);
  const [transitionData, setTransitionData] = useState<DataShowcase | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = useState<CurrentSlide | null>(null);

  useEffect(() => {
    if (fetchedData) {
      const sliderFetchedData: DataShowcase[] = fetchedData.map(
        (item: any) => ({
          img: item.imageCover, // Use the image cover directly
          title: item.name, // Name becomes title
          description: item.description, // Description maps directly
          location: item.location, // Location maps directly
          slug: item.name.toLowerCase().replace(/\s+/g, "-"), // Use `id` as slug
        })
      );

      setData(sliderFetchedData.slice(1));
      setCurrentSlide({
        data: sliderFetchedData[0],
        index: 0,
      });
      setTransitionData(sliderFetchedData[0]);
    }
  }, [fetchedData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center space-y-8 flex-col md:flex-row overflow-hidden">
        {/* Large Image Placeholder */}
        <SkeletonLarge />
        {/* Carousel Images Placeholder */}
        <div className="flex flex-col items-start justify-start">
          <SkeletonCarousel />

          <div className="flex items-center justify-center mt-20 w-full gap-2">
            <div className="w-12 h-12 rounded-full bg-black/20"></div>
            <div className="w-12 h-12 rounded-full bg-black/20"></div>
            <div className="w-[80%] h-1 bg-black/20"></div>
            <div className="w-12 h-12 rounded-full bg-black/20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        {/* Mascot Image */}
        <div className="w-48 h-48 overflow-hidden">
          <Image
            src="/eror-maskot.png"
            alt="Leaf Mascot"
            width={1080}
            height={1080}
            className="rotate-[10deg]"
          />
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-red-500 mt-4">
          Oops! Sepertinya ada yang salah.
        </h2>
        <p className="text-gray-600 mt-2">
          Silakan coba refresh lagi nanti atau hubungi dukungan jika masalah
          berlanjut.
        </p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen select-none overflow-hidden text-white antialiased">
      <AnimatePresence>
        {transitionData && currentSlide && (
          <>
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
                <div className="col-span-6 flex flex-1 md:justify-center justify-start md:p-10 flex-col h-full mt-20 md:mt-0">
                  <Slides datas={data} />
                  <Controls
                    currentSlideData={currentSlide}
                    data={data}
                    transitionData={transitionData}
                    // @ts-ignore
                    initData={fetchedData ? data[0] : null}
                    handleData={setData}
                    handleTransitionData={setTransitionData as any}
                    handleCurrentSlideData={setCurrentSlide as any}
                    sliderData={data}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
