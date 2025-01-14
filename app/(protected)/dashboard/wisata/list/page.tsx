"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Fetch function
const fetchWisata = async ({ queryKey }: { queryKey: [string] }) => {
  const response = await fetch(`/api/wisata`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Wisata data");
  }

  return response.json();
};

export default function WisataListPage() {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["wisata"],
    queryFn: fetchWisata,
  });

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data Wisata</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Berikut adalah daftar data Wisata yang tersedia!
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
