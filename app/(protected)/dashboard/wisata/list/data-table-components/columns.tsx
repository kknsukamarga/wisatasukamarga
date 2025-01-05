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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="w-[24px] h-[24px]">
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          width={24}
          height={24}
        />
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
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
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">
        {new Intl.NumberFormat("en-ID", {
          style: "currency",
          currency: "IDR",
        }).format(row.getValue("price"))}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
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
      // Explicitly type `status`
      const status: string = row.getValue("status") as string;

      const statusColors: Record<string, string> = {
        Buka: "text-green",
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
          {date.toLocaleDateString("en-US", {
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
          {date.toLocaleDateString("en-US", {
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
