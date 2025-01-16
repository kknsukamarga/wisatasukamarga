import { TangoSansBold } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MapPinned } from "lucide-react";
import { CDN_GITHUB_URL } from "@/lib/utils";

function InteractiveMap() {
  return (
    <div
      className="min-h-screen bg-gray text-white flex flex-col items-center justify-center py-10"
      id="interactive-map"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full bg-orange-primary z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-map-question"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 20l-6 -3l-6 3v-13l6 -3l6 3l6 -3v7.5" />
            <path d="M9 4v13" />
            <path d="M15 7v5.5" />
            <path d="M19 22v.01" />
            <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
          </svg>
        </div>

        <h2
          className={`${TangoSansBold.className} mx-auto text-2xl text-white text-center gap-2 mt-5`}
        >
          Ilustrasi
          <br />
          Interaktif{" "}
          <span className="bg-orange-primary px-4 pt-2 pb-1">Map</span>
        </h2>
      </div>

      <div className="mt-10 px-2 md:px-0 rounded-xl overflow-hidden">
        <Image
          src={`${CDN_GITHUB_URL}map.png`}
          alt="icon-lake"
          width={1314}
          height={910}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <Link href="/peta-interaktif" className="mx-auto">
          <Button className="mt-12 bg-white text-gray hover:bg-white hover:text-gray flex items-center">
            <MapPinned />
            Coba fitur Interaktif Map
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InteractiveMap;
