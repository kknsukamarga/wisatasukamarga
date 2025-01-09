"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Umkm } from "./schema";

export const columns: ColumnDef<Umkm>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Pilih semua"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Pilih baris"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Produk" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] font-medium truncate">
        {row.getValue("product_name")}
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pemilik" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] font-medium truncate">
        {row.getValue("owner")}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] font-medium capitalize truncate">
        {row.getValue("category")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] text-gray-700 truncate">
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
      <div className="max-w-[120px] text-green-500 font-semibold truncate">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(row.getValue("price"))}
      </div>
    ),
  },
  {
    accessorKey: "wanumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nomor WhatsApp" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] text-blue-500 truncate">
        <a
          href={`https://wa.me/${row.getValue("wanumber")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("wanumber")}
        </a>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
