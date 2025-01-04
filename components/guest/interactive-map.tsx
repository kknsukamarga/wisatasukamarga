import { TangoSansBold } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function InteractiveMap() {
  return (
    <div
      className="min-h-screen bg-gray text-white flex flex-col items-center justify-center py-10"
      id="interactive-map"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full bg-orange-primary z-20">
          <Image src="/icon-lake.png" alt="icon-lake" width={32} height={32} />
        </div>

        <h2
          className={`${TangoSansBold.className} mx-auto text-2xl text-white text-center gap-2 mt-5`}
        >
          Ilustrasi
          <br />
          Interactive{" "}
          <span className="bg-orange-primary px-4 pt-2 pb-1">Map</span>
        </h2>
      </div>

      <div className="mt-10">
        <Image
          src="/interactive-map.png"
          alt="icon-lake"
          width={1314}
          height={910}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <Link href="/interactive-map" className="mx-auto">
          <Button className="mt-12">Coba fitur interactive map</Button>
        </Link>
      </div>
    </div>
  );
}

export default InteractiveMap;
