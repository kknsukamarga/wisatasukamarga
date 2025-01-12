"use client";

import { useState, useEffect } from "react";
import UMKMGrid from "@/components/guest/umkm/UMKMGrid";
import SkeletonGrid from "@/components/guest/umkm/SkeletonGrid";

export default function UMKMSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        const response = await fetch("/api/umkm", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch UMKM data");
        }

        const fetchedData = await response.json();
        setData(fetchedData || []);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  if (loading)
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
  if (error)
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-red-500 mt-4">
          Oops! Sepertinya ada yang salah.
        </h2>
        <p className="text-gray-600 mt-2">
          Silakan coba lagi nanti atau hubungi dukungan jika masalah berlanjut.
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
