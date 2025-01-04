import Link from "next/link";
import EmblaCarousel from "../ui/embla-carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "../ui/button";
import Image from "next/image";
import { TangoSansBold } from "@/app/fonts";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function HighlightUMKM() {
  return (
    <div
      className="min-h-screen bg-gray py-10 text-white flex flex-col items-center justify-center"
      id="highlight-umkm"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
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
      <div className="rounded-xl w-full flex bg-opacity-80 justify-center items-center relative bg-orange-secondary overflow-hidden mt-5 p-5 flex-col">
        <Image
          src="/umkm-pattern.png"
          alt="umkm-pattern"
          className="absolute inset-0 z-10"
          layout="fill"
        />

        <EmblaCarousel slides={SLIDES} options={OPTIONS} />

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
