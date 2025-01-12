"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FasilitasWisata } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export const columns: ColumnDef<FasilitasWisata>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Fasilitas" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] font-medium capitalize">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
    cell: ({ row }) => {
      const image = row.getValue("image") as string;

      return (
        <div className="w-[48px] h-[48px]">
          {image && (
            <Image
              src={image}
              alt="Gambar Fasilitas"
              width={48}
              height={48}
              className="object-cover rounded"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },

  {
    accessorKey: "wisataId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wisata Terkait" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[150px] font-medium capitalize">
          {/* @ts-ignore */}
        {row.original.wisata.name}
      </div>
      )
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dibuat Pada" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-sm">
          {date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diperbarui Pada" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return (
        <div className="text-sm">
          {date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
