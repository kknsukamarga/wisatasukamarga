import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";
import { TangoSansBold } from "@/app/fonts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Fungsi untuk mengambil data UMKM dari API
const fetchUMKM = async ({ queryKey }: any) => {
  const response = await fetch(`/api/umkm?page=1&pagesize=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data UMKM");
  }

  return response.json();
};

const SkeletonCard = () => {
  return (
    <div className="w-[280px] md:w-[300px] lg:w-[310px] h-[400px] md:h-[500px] xl:h-[600px] rounded-lg bg-gray-300 animate-pulse">
      <div className="w-full h-[45%] bg-black/10"></div>
      <div className="flex flex-col justify-between bg-white py-4 p-3">
        <div className="w-[60%] h-6 bg-black/10 mb-2"></div>
        <div className="w-[90%] h-4 bg-black/10 mb-2"></div>
        <div className="flex justify-between items-center">
          <div className="w-[30%] h-6 bg-black/10"></div>
          <div className="w-8 h-8 bg-black/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

function HighlightUMKM({ page = 1, pageSize = 5, search = "" }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["umkm", { page, pageSize, search }],
    queryFn: fetchUMKM,
  });

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gray text-white flex flex-col items-center justify-center"
        id="highlight-umkm"
      >
        <div className="flex mx-auto justify-center items-center flex-col text-center w-fit py-14">
          <div className="p-2 rounded-full bg-orange-primary z-20">
            <Image
              src="/icon-lake.png"
              alt="icon-lake"
              width={32}
              height={32}
            />
          </div>

          <h2
            className={`${TangoSansBold.className} mx-auto text-2xl text-white text-center gap-2 mt-5`}
          >
            Temukan
            <br />
            Produk{" "}
            <span className="bg-orange-primary px-4 pt-2 pb-1">UMKM</span>
          </h2>

          <p className="md:w-[40%] w-[90%] mx-auto mt-2">
            UMKM merupakan tonggak utama perekonomian desa, dengan berbagai
            produk unggulan yang dihasilkan oleh warga setempat. Mari dukung
            kemajuan desa dengan membeli dan menggunakan produk-produk lokal
            berkualitas ini!
          </p>
        </div>

        <div className="rounded-t-xl w-full flex justify-center items-center relative bg-orange-primary overflow-hidden mt-5 py-5 flex-col">
          <Image
            src="/umkm-pattern.png"
            alt="umkm-pattern"
            className="absolute inset-0 z-10 w-full h-full object-cover"
            layout="fill"
          />
          <div className="scroll-smooth max-w-[1920px] xl:pl-20 z-20 lg:pl-20 md:pl-10 relative w-full pl-5 mx-auto mt-20">
            <div className="flex overflow-x-auto space-x-4">
              {/* Skeleton loading */}
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
            </div>
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
    <div
      className="min-h-screen bg-gray text-white flex flex-col items-center justify-center"
      id="highlight-umkm"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit py-14">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
          </svg>
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

      <div className="items-center w-full relative translate-y-[-150px] hidden md:flex">
        <Image
          src="/umkm-kiri.png"
          alt="umkm-kiri"
          // layout="fill"
          width={320}
          height={320}
          className="z-20 absolute left-0"
        />

        <Image
          src="/umkm-kanan.png"
          alt="umkm-kanan"
          // layout="fill"
          width={320}
          height={320}
          className="z-20 absolute right-0"
        />
      </div>

      <div className="rounded-t-xl w-full flex justify-center items-center relative bg-orange-primary overflow-hidden mt-5 py-5 flex-col">
        <Image
          src="/umkm-pattern.png"
          alt="umkm-pattern"
          className="absolute inset-0 z-10 w-full h-full object-cover"
          layout="fill"
        />

        <div className="scroll-smooth max-w-[1920px] xl:pl-20 z-20 lg:pl-20 md:pl-10 relative w-full pl-5 mx-auto mt-20">
          <div className="flex overflow-x-auto space-x-4">
            {data?.umkm?.map((umkm: any, index: number) => (
              <div
                key={index}
                className="basis-72 md:basis-80 xl:basis-[20rem]"
              >
                <Card className="xl:w-[300px] cursor-grab md:w-[300px] lg:w-[310px] md:h-[500px] w-[280px] h-[400px] xl:h-[400px] overflow-hidden rounded-lg relative bg-cover font-montserrat bg-white">
                  <CardContent className="p-0 w-full h-[45%] text-white">
                    <Image
                      src={umkm.image[0]}
                      alt={umkm.product_name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover rounded-lg p-2 object-center"
                    />
                  </CardContent>

                  <CardContent className="flex flex-col items-start justify-between bg-white py-4 px-2">
                    <h3 className="font-bold text-lg line-clamp-1">
                      {umkm.product_name}
                    </h3>

                    <p className="mt-2 text-base text-justify line-clamp-3">
                      {umkm.description}
                    </p>

                    <div className="mt-6 flex w-full justify-between items-center">
                      <h3 className="font-bold text-lg">
                        {" "}
                        Rp{umkm.price.toLocaleString("id-ID")}
                      </h3>

                      <Link href={`/umkm/${umkm.slug}`} passHref>
                        <Button className="rounded-full px-3">
                          <MoveRightIcon />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

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
