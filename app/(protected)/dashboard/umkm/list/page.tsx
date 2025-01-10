"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUMKM = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; pageSize: number; search: string }];
}) => {
  const [, { page, pageSize, search }] = queryKey;

  const response = await fetch(
    `/api/umkm?page=${page}&pagesize=${pageSize}${
      search ? `&search=${search}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data UMKM");
  }

  return response.json();
};

export default function UMKMListPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["umkm", { page, pageSize, search }],
    queryFn: fetchUMKM,
  });

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
          data={isLoading || isFetching ? [] : data?.umkm || []}
          columns={columns}
          isLoading={isLoading}
          error={error ? (error as Error).message : null}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          search={search}
          setSearch={setSearch}
          length={data?.length || 0}
        />
      </div>
    </div>
  );
}
