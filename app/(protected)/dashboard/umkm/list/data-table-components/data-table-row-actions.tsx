"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface UMKMData {
  slug: string;
  [key: string]: any;
}

interface DataTableRowActionsProps {
  row: Row<UMKMData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { toast } = useToast();
  const { slug } = row.original;
  const router = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (slug: string) => {
      const formData = new FormData();
      formData.append("slug", slug);

      const response = await fetch(`/api/umkm`, {
        method: "DELETE",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.details || "Gagal menghapus data UMKM.");
      }

      return response.json();
    },
    onSuccess: () => {
      setDialogOpen(false);
      toast({
        title: "Berhasil!",
        description: "UMKM berhasil dihapus.",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: () => {
      setDialogOpen(false);
      toast({
        title: "Gagal!",
        description: "Gagal menghapus UMKM. Silakan coba lagi.",
      });
    },
  });

  const handleDelete = () => {
    if (!slug) {
      toast({
        title: "Gagal!",
        description: "Data Tidak Ditemukan!",
      });
      return;
    }

    mutate(slug);
  };

  const handleEdit = () => {
    if (!slug) {
      console.error("Error: Slug not found for this row.");
      return;
    }

    router.push(`/dashboard/umkm/edit/${slug}`);
  };

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus UMKM ini? Tindakan ini tidak
              dapat dibatalkan.
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
    </>
  );
}
