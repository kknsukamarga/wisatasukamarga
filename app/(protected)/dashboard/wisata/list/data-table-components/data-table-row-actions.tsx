"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DeleteConfirmModal from "../../_components/delete-pop-up";
import { useToast } from "@/hooks/use-toast";

interface WisataData {
  id: string; // Ensure 'slug' exists as a property
  [key: string]: any; // Allow other properties dynamically
}

interface DataTableRowActionsProps {
  row: Row<WisataData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();
  const { id } = row.original;
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setIsOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    setLoading(true); // Start loading state

    try {
      await fetch(`/api/wisata?id=${id}`, {
        method: "DELETE",
      });

      toast({
        title: "Wisata berhasil dihapus !",
        description: "Wisata berhasil dihapus dari list.",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan pada bagian ini",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const onClose = () => setIsOpen(false);

  const onOpen = (id: string) => {
    setIsOpen(true); // Open the dialog
  };

  const handleEdit = () => {
    if (!id) {
      toast({
        title: "Error",
        description: "Slug tidak ditemukan untuk bagian ini",
        variant: "destructive",
      });
      return;
    }

    router.push(`/dashboard/wisata/edit/${id}`);
  };

  return (
    <>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        loading={loading}
      />
    </>
  );
}
