"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, FileText, Store, MapPin, Landmark } from "lucide-react";

export default function Stats() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Gagal mengambil statistik");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
    retry: 2, // Retry 2 kali jika gagal
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-screen bg-[#f6f7ee] text-gray-900 rounded-md">
      {/* Section 1: Statistik Utama */}
      <div className="grid auto-rows-min gap-6 md:grid-cols-2">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : isError ? (
          <p className="col-span-2 text-center text-red-500">
            Error: {(error as Error).message}
          </p>
        ) : (
          <>
            <StatCard
              title="Pengguna"
              count={data?.data.totalUsers}
              icon={<Users />}
            />
            <StatCard
              title="Artikel Blog"
              count={data?.data.totalBlogs}
              icon={<FileText />}
            />
          </>
        )}
      </div>

      {/* Section 2: Statistik UMKM */}
      <div className="min-h-[50vh] flex-1 rounded-xl bg-[#CFCBBA] shadow-lg flex items-center justify-center">
        {isLoading ? (
          <SkeletonBox />
        ) : (
          <StatDetail
            title="UMKM Terdaftar"
            count={data?.data.totalUmkm}
            icon={<Store />}
          />
        )}
      </div>

      {/* Section 3: Statistik Wisata & Fasilitas */}
      <div className="grid auto-rows-min gap-6 md:grid-cols-2">
        <div className="min-h-[50vh] flex-1 rounded-xl bg-[#CFCBBA] shadow-lg flex items-center justify-center">
          {isLoading ? (
            <SkeletonBox />
          ) : (
            <StatDetail
              title="Tempat Wisata"
              count={data?.data.totalWisata}
              icon={<MapPin />}
            />
          )}
        </div>

        <div className="min-h-[50vh] flex-1 rounded-xl bg-[#CFCBBA] shadow-lg flex items-center justify-center">
          {isLoading ? (
            <SkeletonBox />
          ) : (
            <StatDetail
              title="Fasilitas Wisata"
              count={data?.data.totalFasilitasWisata}
              icon={<Landmark />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* Komponen Kartu Statistik */
function StatCard({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: JSX.Element;
}) {
  return (
    <div className="aspect-video rounded-xl bg-[#606C38] shadow-lg flex flex-col items-center justify-center p-8 md:p-10 text-[#f6f7ee]">
      <div className="text-5xl md:text-6xl">{icon}</div>
      <h2 className="text-lg md:text-xl font-semibold mt-2">{title}</h2>
      <p className="text-5xl md:text-6xl font-bold mt-1">{count}</p>
    </div>
  );
}

/* Komponen Detail Statistik */
function StatDetail({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: JSX.Element;
}) {
  return (
    <div className="text-center flex flex-col items-center p-6 md:p-10">
      <div className="text-6xl md:text-7xl text-[#1F3D3B]">{icon}</div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3">
        {title}
      </h2>
      <p className="text-5xl md:text-6xl font-extrabold text-[#606C38] mt-2">
        {count}
      </p>
    </div>
  );
}

/* Skeleton Loading Card */
function SkeletonCard() {
  return <div className="aspect-video rounded-xl bg-gray-300 animate-pulse" />;
}

/* Skeleton Loading Box */
function SkeletonBox() {
  return <div className="w-1/2 h-16 bg-gray-300 rounded-lg animate-pulse" />;
}
