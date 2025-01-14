"use client";

import { useParams } from "next/navigation";
import EditForm from "../../_components/edit-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchWisataData = async (id: string) => {
  const response = await fetch(`/api/wisata?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data.wisata;
};

export default function WisataEditPage() {
  const { id } = useParams();

  const {
    data: initialData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["wisata", id],
    queryFn: () => fetchWisataData(id as string),
  });

  if (isLoading) {
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
          <h1 className="text-red-500">Error: {error.message}</h1>
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
      <EditForm initialData={initialData} pageTitle="Edit Wisata" />
    </div>
  );
}
