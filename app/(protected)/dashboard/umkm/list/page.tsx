"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";

export default function UMKMListPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

      setData(fetchedData || []); // Set an empty array if data is null or undefined
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUMKM();
  }, []);

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
          data={loading ? [] : data}
          columns={columns}
          isLoading={loading}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-center text-red-500 mt-4">Error: {error}</div>
      )}
    </div>
  );
}
