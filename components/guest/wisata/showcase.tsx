"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundImage from "./backgroundImage";
import SlideInfo from "./slideinfo";
import Slides from "./slides";
import Controls from "./controls";
import { useQuery } from "@tanstack/react-query";

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
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
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
          slug: item.id, // Use `id` as slug
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
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
                <div className="col-span-6 flex flex-1 md:justify-center justify-start md:p-10 flex-col h-full">
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
