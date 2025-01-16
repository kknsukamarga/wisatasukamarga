"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TangoSansBold } from "@/app/fonts";
import { Loader2, MapPin } from "lucide-react";
import Gallery from "@/components/guest/wisata/detail/gallery";
import CarouselAttractions from "@/components/guest/wisata/detail/carousel-attractive";
import Hero from "./hero";
import Image from "next/image";
import FooterDetailWisata from "./footer";
import VideoSection from "./video-section";

const fetchWisataData = async (namaWisata) => {
  const response = await fetch(`/api/wisata?name=${namaWisata}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await response.json();
  return result.wisata[0];
};

const WisataDetails = ({ namaWisata }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wisata", { namaWisata }],
    queryFn: () => fetchWisataData(namaWisata),
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Loader2 size={32} className="text-orange-primary animate-spin" />
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-screen">
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

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 12h2M5 12h2M12 5v2M12 17v2M16.24 7.76l1.42 1.42M7.76 16.24l1.42 1.42M16.24 16.24l1.42-1.42M7.76 7.76l1.42-1.42"
            />
          </svg>
          <p className="text-lg text-gray-700">Data tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero data={data} />

      <div className="md:px-10 xl:px-20 px-2 py-20">
        <h1 className="text-4xl font-bold mb-4">Deskripsi {data.name}</h1>
        <p className="text-sm md:text-lg mb-6 text-justify">
          {data.description}
        </p>
      </div>

      <div className="py-10">
        <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
          <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
              <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            </svg>
          </div>

          <h2
            className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-center`}
          >
            Video Wisata {data.name}
          </h2>
          {/* <p className="md:w-[50%] w-[90%] mx-auto mt-2">
            Nikmati keindahan Suka Marga melalui galeri wisata yang memamerkan
            panorama alam memukau, dari perbukitan hijau, kawah, air terjun,
            hingga danau yang memikat.
          </p> */}
        </div>

        <VideoSection />
      </div>

      <div className="py-10">
        <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
          <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
              <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            </svg>
          </div>

          <h2
            className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-center`}
          >
            Gallery Wisata
          </h2>

          <p className="md:w-[50%] w-[90%] mx-auto mt-2">
            Nikmati keindahan Suka Marga melalui galeri wisata yang memamerkan
            panorama alam memukau, dari perbukitan hijau, kawah, air terjun,
            hingga danau yang memikat.
          </p>
        </div>
        <Gallery images={data.image} />
      </div>

      <div className="py-10">
        <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
          <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
            <MapPin size={32} />
          </div>

          <h2
            className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-center`}
          >
            Lokasi Wisata
          </h2>

          <p className="md:w-[50%] w-[90%] mx-auto mt-2">
            {data.name} adalah salah satu destinasi utama di Suka Marga, Lampung
            Barat. Dengan lanskap alam yang memukau dan suasana yang nyaman,
            tempat ini menjadi pilihan tepat untuk berwisata.
          </p>

          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&q=${data.name}+suka+marga`}
            loading="lazy"
            className="rounded-md mt-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] xl:w-[600px] xl:h-[600px]"
          ></iframe>
        </div>
      </div>

      <div className="py-10">
        <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
          <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-air-balloon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 19m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M12 16c3.314 0 6 -4.686 6 -8a6 6 0 1 0 -12 0c0 3.314 2.686 8 6 8z" />
              <path d="M12 9m-2 0a2 7 0 1 0 4 0a2 7 0 1 0 -4 0" />
            </svg>
          </div>

          <h2
            className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-center`}
          >
            Daya Tarik Wisata
          </h2>

          <p className="md:w-[50%] w-[90%] mx-auto mt-2">
            Berikut merupakan daya tarik wisata di {data.name} yang bisa menjadi
            pilihan untuk dikunjungi.
          </p>

          <div className="md:overflow-auto md:flex-wrap md:flex-row flex flex-col items-center w-full gap-5 mx-auto overflow-hidden justify-center mt-10">
            <CarouselAttractions attractions={data.fasilitasWisata} />
          </div>
        </div>
      </div>

      <FooterDetailWisata namaWisata={namaWisata} />
    </>
  );
};

export default WisataDetails;
