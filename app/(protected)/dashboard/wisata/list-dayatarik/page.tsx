"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useQuery } from "@tanstack/react-query";

const fetchFasilitasWisata = async () => {
  const response = await fetch(`/api/fasilitas-wisata`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Terjadi kesalahan, mohon tunggu sebentar");
  }

  return response.json();
};

export default function WisataListPage() {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["daya-tarik-wisata"],
    queryFn: fetchFasilitasWisata,
  });

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data Daya Tarik</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Berikut adalah daftar data Daya Tarik yang tersedia!
        </p>
      </div>

      <DataTable
        data={isLoading || isFetching ? [] : data || []}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
}
