"use client";

import { useQuery } from "@tanstack/react-query";
import UMKMEditForm from "../../_components/umkm-edit-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UMKMData {
  product_name: string;
  image: string[];
  price: number;
  description: string;
  wanumber: string;
  owner: string;
  category?: "service" | "product";
}

const fetchUMKMBySlug = async ({
  queryKey,
}: {
  queryKey: [string, { slug: string }];
}): Promise<UMKMData> => {
  const [, { slug }] = queryKey;

  const response = await fetch(`/api/umkm?slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch UMKM data");
  }

  return response.json();
};

export default function UMKMEditPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["umkm", { slug }],
    queryFn: fetchUMKMBySlug,
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
          <h1 className="text-red-500">Terjadi Kesalahan!</h1>
        </CardHeader>
      </Card>
    );
  }

  if (!data) {
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
      <UMKMEditForm initialData={data} pageTitle="Edit UMKM" slug={slug} />
    </div>
  );
}
