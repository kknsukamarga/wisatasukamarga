"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
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
import { revalidatePath } from "next/cache";
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
  const router = useRouter(); // Router for navigation
  const [isDialogOpen, setDialogOpen] = useState(false); // State for delete confirmation dialog
  const [isDeleting, setIsDeleting] = useState(false); // State for loading state
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false); // State for success dialog

  const handleDelete = async () => {
    if (!slug) {
      console.error("Error: Slug not found for this row.");
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/umkm?slug=${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete UMKM.");
      }

      setDialogOpen(false);

      toast({
        title: "Berhasil!",
        description: "UMKM berhasil dihapus.",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error deleting UMKM:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!slug) {
      console.error("Error: Slug not found for this row.");
      return;
    }

    router.push(`/dashboard/umkm/edit/${slug}`); // Navigate to the edit page
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
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus UMKM ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Message Dialog */}
      <AlertDialog
        open={isSuccessDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>UMKM Berhasil Dihapus</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setSuccessDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
