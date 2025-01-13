"use client";

import { useQuery } from "@tanstack/react-query";
import UMKMGrid from "@/components/guest/umkm/UMKMGrid";
import SkeletonGrid from "@/components/guest/umkm/SkeletonGrid";
import Image from "next/image";

const fetchUMKM = async () => {
  const response = await fetch("/api/umkm", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch UMKM data");
  }

  return response.json();
};

export default function UMKMSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["umkmData"],
    queryFn: fetchUMKM,
  });

  if (isLoading)
    return (
      <section className="container mx-auto p-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">UMKM Suka Marga</h1>
          <p className="text-lg">
            Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan
            menarik seputar topik ini, jangan ragu untuk membaca seluruh artikel
            yang telah kami sajikan secara detail di sini!
          </p>
        </header>
        <SkeletonGrid itemsPerPage={8} />
      </section>
    );

  if (isError)
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

  return (
    <section className="container mx-auto p-4 py-10">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">UMKM Suka Marga</h1>
        <p className="text-lg">
          Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan menarik
          seputar topik ini, jangan ragu untuk membaca seluruh artikel yang
          telah kami sajikan secara detail di sini!
        </p>
      </header>
      <UMKMGrid data={data} />
    </section>
  );
}
