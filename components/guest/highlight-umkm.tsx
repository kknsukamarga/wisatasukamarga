import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "../ui/button";
import Image from "next/image";
import { TangoSansBold } from "@/app/fonts";

type KegiatanFakultas = {
  date: string;
  title: string;
  description: string;
  backgroundClass: string; // CSS class for background styling
};

export const DataKegiatanFakultas: KegiatanFakultas[] = [
  {
    date: "20 Juli 2024",
    title: "Info Kegiatan SLurd 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iste, nulla nihil neque consequatur.",
    backgroundClass: "bg-mobile-hero-background bg-cover",
  },
  {
    date: "25 Juli 2024",
    title: "Info Kegiatan SLurd 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iste, nulla nihil neque consequatur.",
    backgroundClass: "bg-blue-500 bg-cover",
  },
  {
    date: "30 Juli 2024",
    title: "Info Kegiatan SLurd 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iste, nulla nihil neque consequatur.",
    backgroundClass: "bg-green-500 bg-cover",
  },
  {
    date: "5 Agustus 2024",
    title: "Info Kegiatan SLurd 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iste, nulla nihil neque consequatur.",
    backgroundClass: "bg-red-500 bg-cover",
  },
  {
    date: "10 Agustus 2024",
    title: "Info Kegiatan SLurd 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iste, nulla nihil neque consequatur.",
    backgroundClass: "bg-yellow-500 bg-cover",
  },
];

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function HighlightUMKM() {
  return (
    <div
      className="min-h-screen bg-gray text-white flex flex-col items-center justify-center"
      id="highlight-umkm"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit py-14">
        <div className="p-2 rounded-full bg-orange-primary z-20">
          <Image src="/icon-lake.png" alt="icon-lake" width={32} height={32} />
        </div>

        <h2
          className={`${TangoSansBold.className} mx-auto text-2xl text-white text-center gap-2 mt-5`}
        >
          Temukan
          <br />
          Produk <span className="bg-orange-primary px-4 pt-2 pb-1">UMKM</span>
        </h2>

        <p className="md:w-[40%] w-[90%] mx-auto mt-2">
          UMKM merupakan tonggak utama perekonomian desa, dengan berbagai produk
          unggulan yang dihasilkan oleh warga setempat. Mari dukung kemajuan
          desa dengan membeli dan menggunakan produk-produk lokal berkualitas
          ini!
        </p>
      </div>

      {/* carousel */}
      <div className="flex justify-between items-center w-full absolute translate-y-[-300px]">
        <Image
          src="/umkm-kiri.png"
          alt="umkm-kiri"
          // layout="fill"
          width={320}
          height={320}
          className="z-20"
        />
        <Image
          src="/umkm-kanan.png"
          alt="umkm-kanan"
          // layout="fill"
          width={320}
          height={320}
          className="z-20"
        />
      </div>

      <div className="rounded-xl w-full flex justify-center items-center relative bg-orange-primary overflow-hidden mt-5 py-5 flex-col">
        <Image
          src="/umkm-pattern.png"
          alt="umkm-pattern"
          className="absolute inset-0 z-10"
          layout="fill"
        />

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="scroll-smooth max-w-[1920px] xl:pl-20 z-20 lg:pl-20 md:pl-10 relative w-full pl-5 mx-auto mt-20"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {DataKegiatanFakultas.map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-72 md:basis-80 xl:basis-[20rem]"
              >
                <Card
                  className={`xl:w-[300px] cursor-grab md:w-[300px] lg:w-[310px] md:h-[550px] w-[280px] h-[500px] xl:h-[400px] overflow-hidden rounded-lg relative bg-cover font-montserrat bg-white`}
                >
                  <CardContent className="p-0 w-full h-full text-white">
                    <Image
                      src={
                        "https://awsimages.detik.net.id/community/media/visual/2023/04/10/ciri-ciri-kopi-berkualitas-1.jpeg"
                      }
                      alt="kopi pai"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-fit rounded-lg p-2 object-center"
                    />
                  </CardContent>

                  <CardContent className="absolute bottom-0 flex flex-col items-start justify-center bg-white py-4">
                    <h3 className="font-bold text-lg">Kopi Lampung Suoh</h3>

                    <p className="mt-2 text-base text-justify">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Excepturi iste, nulla nihil neque consequatur
                    </p>

                    <div className="mt-2 flex w-full justify-between items-center">
                      <h3 className="font-bold text-lg">Rp100.000</h3>

                      <Button className="rounded-full px-3">
                        <MoveRightIcon />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}

        <div className="w-full flex justify-center items-center z-20">
          <Link href="/umkm" className="mx-auto">
            <Button className="mt-12">Lihat semua produk umkm</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HighlightUMKM;
