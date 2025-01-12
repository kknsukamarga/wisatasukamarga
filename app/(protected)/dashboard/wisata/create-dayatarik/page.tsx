"use client";

import FasilitasCard from "../_components/fasilitas-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Wisata } from "../_components/fasilitas-card";

const fetchWisataData = async (): Promise<Wisata[]> => {
  const response = await fetch("/api/wisata", {
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

  return data;
};

export default function WisataCreatePage() {
  const {
    data: initialData,
    error,
    isLoading,
  } = useQuery<Wisata[]>({
    queryKey: ["wisata"],
    queryFn: fetchWisataData,
  });

  if (isLoading) {
    return (
      <Card className="mx-auto w-full p-4">
        <CardHeader className="p-0 py-5">
          <Skeleton className="h-8 w-1/3" />
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <Skeleton className="w-full h-48" />{" "}
                {/* Placeholder for image */}
                <Skeleton className="h-6 w-3/4 mt-4 mx-auto" />{" "}
                {/* Placeholder for title */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />{" "}
                {/* Placeholder for button */}
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <h1 className="text-red-500">Error: {error.message}</h1>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div>
      <FasilitasCard
        initialData={initialData || []}
        pageTitle="Tambah Daya Tarik"
      />
    </div>
  );
}
