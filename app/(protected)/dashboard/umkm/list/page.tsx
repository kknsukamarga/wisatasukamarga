"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";
import { useReactTable } from "@tanstack/react-table";

export default function UMKMListPage() {
  const [data, setData] = useState({ umkm: [], length: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const fetchUMKM = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/umkm?page=${page}&pagesize=${pageSize}${
          search ? `&search=${search}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data UMKM");
      }

      const fetchedData = await response.json();

      setData(fetchedData || []); // Set an empty array if data is null or undefined
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUMKM();
  }, [page, pageSize, search]);
  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data UMKM</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Berikut adalah daftar data UMKM yang tersedia!
        </p>
      </div>

      <div className="relative">
        <DataTable
          data={loading ? [] : data["umkm"]}
          columns={columns}
          isLoading={loading}
          error={error}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          search={search}
          setSearch={setSearch}
          length={data["length"]}
        />
      </div>
    </div>
  );
}
