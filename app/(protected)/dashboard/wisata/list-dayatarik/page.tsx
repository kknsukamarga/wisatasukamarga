"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";

export default function WisataListPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    const fetchWisata = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/wisata?page=${page}&pageSize=${pageSize}&search=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Wisata data");
        }

        const result = await response.json();

        if (!result || result.length === 0) {
          throw new Error("No Wisata data available.");
        }
        setData(result.wisata);
        setTotalLength(result.totalLength);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, [page, pageSize, search]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data Daya Tarik</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Berikut adalah daftar data Daya Tarik yang tersedia!
        </p>
      </div>

      <DataTable data={data} columns={columns} isLoading={loading} />
    </div>
  );
}