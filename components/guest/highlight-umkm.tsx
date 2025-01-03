import Link from "next/link";
import EmblaCarousel from "../ui/embla-carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "../ui/button";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function HighlightUMKM() {
  return (
    <div
      className="min-h-screen bg-gray py-10 text-white flex flex-col items-center justify-center"
      id="highlight-umkm"
    >
      HighlightUMKM
      {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
      <div className="w-full flex justify-center items-center">
        <Link href="/umkm" className="mx-auto">
          <Button className="mt-12">Lihat semua produk umkm</Button>
        </Link>
      </div>
    </div>
  );
}

export default HighlightUMKM;
