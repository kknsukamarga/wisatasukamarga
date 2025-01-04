"use client";
import { useEffect, useState } from "react";
import UMKMEditForm from "../../_components/umkm-edit-form";

interface UMKMData {
  product_name: string;
  image: string;
  price: number;
  description: string;
  wanumber: string;
}

export default function UMKMEditPage({ params }: { params: { slug: string } }) {
  const [initialData, setInitialData] = useState<UMKMData | null>(null); // Properly typed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = params;

  useEffect(() => {
    const fetchUMKMData = async () => {
      try {
        const response = await fetch(`/api/umkm?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch UMKM data");
        }
        const data = await response.json();
        setInitialData({
          product_name: data.product_name,
          image: data.image,
          price: data.price,
          description: data.description,
          wanumber: data.wanumber,
        });
      } catch (err) {
        setError((err as Error).message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchUMKMData();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!initialData) {
    return <div>No data found for this UMKM.</div>;
  }

  return (
    <div>
      <UMKMEditForm
        initialData={initialData}
        pageTitle="Edit UMKM"
        slug={slug}
      />
    </div>
  );
}
