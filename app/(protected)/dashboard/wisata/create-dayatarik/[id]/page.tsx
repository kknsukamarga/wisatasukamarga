"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import FasilitasForm from "../../_components/fasilitas-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchWisataById = async (id: string) => {
  const response = await fetch(`/api/wisata?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Wisata data");
  }

  const data = await response.json();
  return data;
};

export default function WisataEditPage() {
  const { id } = useParams();

  const {
    data: initialData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["wisata", id],
    queryFn: () => fetchWisataById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <Skeleton className=" h-8 w-1/3" />
        </CardHeader>
        <CardContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`space-y-1 ${index == 0 ? "" : "mt-10"} `}
            >
              <Skeleton className=" h-6 w-1/2" />
              <Skeleton className={`${index == 1 ? "h-20" : "h-10"} w-full`} />
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
          <h1 className="text-red-500">Error: {error.message}</h1>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div>
      <FasilitasForm initialData={initialData} pageTitle="Tambah Daya Tarik" />
    </div>
  );
}
