"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Wisata } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export const columns: ColumnDef<Wisata>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama wisata" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] font-medium capitalize">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "imageCover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar Cover" />
    ),
    cell: ({ row }) => {
      const imageCover = row.getValue("imageCover") as string;

      return (
        <div className="w-[48px] h-[48px]">
          {imageCover && (
            <Image
              src={imageCover}
              alt="Cover"
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Galeri" />
    ),
    cell: ({ row }) => {
      const images = row.getValue("image") as string[];

      return (
        <div className="w-[48px] h-[48px]">
          {images && (
            <Image
              src={images[0]}
              alt="Image"
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Harga" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(row.getValue("price"))}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const statusColors: Record<string, string> = {
        Buka: "text-green-500",
        Tutup: "text-red-500",
        Pemeliharaan: "text-yellow-500",
      };
      return (
        <div className={cn("font-medium capitalize", statusColors[status])}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
      <DataTableColumnHeader column={column} title="Updated At" />
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