"use client";

import FasilitasCard from "../_components/fasilitas-card";
import { useState, useEffect } from "react";

export default function WisataCreatePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const response = await fetch("/api/fasilitas-wisata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Wisata data");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No Wisata data available.");
        }

        setData(data);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <FasilitasCard
        initialData={null}
        wisataOptions={data}
        pageTitle="Create Wisata"
      />
    </div>
  );
}
