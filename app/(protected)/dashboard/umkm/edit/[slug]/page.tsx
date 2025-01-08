"use client";
import { useEffect, useState } from "react";
import UMKMEditForm from "../../_components/umkm-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

interface UMKMData {
  product_name: string;
  image: string[];
  price: number;
  description: string;
  wanumber: string;
  owner: string;
  category?: "service" | "product";
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
          owner: data.owner,
          category: data.category,
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
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <Skeleton className=" h-8 w-1/3" />
        </CardHeader>
        <CardContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={`space-y-1 ${index == 0 ? "" : "mt-10"} `}
            >
              <Skeleton className=" h-6 w-1/2" />
              <Skeleton className=" h-10 w-full" />
            </div>
          ))}
          <div className="flex justify-end mt-12">
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <h1 className="text-red-500">Error: {error}</h1>
        </CardHeader>
      </Card>
    );
  }

  if (!initialData) {
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <h1>Data Tidak Ada</h1>
        </CardHeader>
      </Card>
    );
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
