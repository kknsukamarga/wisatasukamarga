"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  search: string;
  setSearch: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  search,
  setSearch,
}: DataTableToolbarProps<TData>) {
  const { toast } = useToast();
  const isFiltered = table.getState().columnFilters.length > 0;

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (slugs: string[]) => {
      const formData = new FormData();
      formData.append("slugs", JSON.stringify(slugs));

      const response = await fetch("/api/umkm", {
        method: "DELETE",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error?.details || "Terjadi kesalahan saat menghapus item."
        );
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Item berhasil dihapus.",
      });
      setIsDialogOpen(false);
      table.resetRowSelection();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus item.",
        variant: "destructive",
      });
      setIsDialogOpen(false);
    },
  });

  const handleDelete = () => {
    const rows = table.getFilteredSelectedRowModel().rows;

    const arrayOfSlug = rows.map((row) => {
      // @ts-ignore
      return row.original.slug;
    });

    if (arrayOfSlug.length === 0) {
      toast({
        title: "Gagal",
        description: "Tidak ada item yang dipilih untuk dihapus.",
        variant: "destructive",
      });
      return;
    }

    mutate(arrayOfSlug);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 3000);
  };

  const openDeleteDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search by product name or description..."
          value={search ?? ""}
          onChange={handleSearchChange}
          className="h-8 w-[250px] lg:w-[350px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetGlobalFilter()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button onClick={openDeleteDialog} variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus item yang dipilih? Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
