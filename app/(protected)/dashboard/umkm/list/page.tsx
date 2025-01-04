"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";

export default function UMKMListPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No UMKM data available.");
        }

        setData(data);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data UMKM</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Berikut adalah daftar data UMKM yang tersedia!
        </p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
