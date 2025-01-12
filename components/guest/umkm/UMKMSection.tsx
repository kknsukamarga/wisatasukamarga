"use client";

import { useQuery } from "@tanstack/react-query";
import UMKMGrid from "@/components/guest/umkm/UMKMGrid";
import SkeletonGrid from "@/components/guest/umkm/SkeletonGrid";

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
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-red-500 mt-4">
          Oops! Sepertinya ada yang salah.
        </h2>
        <p className="text-gray-600 mt-2">
          {error instanceof Error ? error.message : "Unknown error"}
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
