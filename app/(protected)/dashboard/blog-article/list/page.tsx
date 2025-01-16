"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
  const response = await fetch(`/api/blog?mode=all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

export default function BlogListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data Blog</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Berikut adalah daftar data Blog dan Artikel yang tersedia!
        </p>
      </div>

      <div className="relative">
        <DataTable
          data={isLoading ? [] : data?.articles || []}
          columns={columns}
          isLoading={isLoading}
          error={error ? (error as Error).message : null}
        />
      </div>
    </div>
  );
}
