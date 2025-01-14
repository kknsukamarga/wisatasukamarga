"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TangoSansBold } from "@/app/fonts";
import { MapPin } from "lucide-react";
import Gallery from "@/components/guest/wisata/detail/gallery";
import CarouselAttractions from "@/components/guest/wisata/detail/carousel-attractive";

const fetchWisataData = async (namaWisata) => {
  const response = await fetch(
    `/api/wisata?name=${encodeURIComponent(namaWisata)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await response.json();
  return result.wisata[0];
};

const WisataDetails = ({ namaWisata }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wisata", { namaWisata }],
    queryFn: fetchWisataData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Data not found</p>;

  return (
    <>
      <div className="md:px-10 px-2 py-20">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15892.7259157773!2d104.26442244958294!3d-5.234166515897918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e47a004b244689f%3A0x50758b3515ab1ee4!2sDanau%20Asam!5e0!3m2!1sid!2sid!4v1736223010351!5m2!1sid!2sid"
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
    </>
  );
};

export default WisataDetails;
