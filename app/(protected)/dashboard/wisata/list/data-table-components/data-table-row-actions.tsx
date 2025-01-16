"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DeleteConfirmModal from "../../_components/delete-pop-up";
import { revalidatePath } from "next/cache";
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
  // Identifier for the Wisata being deleted

  const handleDelete = async () => {
    setIsOpen(true); // Open the modal
  };
  const confirmDelete = async () => {
    if (!id) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan pada bagian ini",
        variant: "destructive",
      });

      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await fetch(`/api/wisata?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete Wisata.");
      }

      toast({
        title: "Wisata berhasil dihapus !",
        description: "Wisata berhasil dihapus dari list.",
      });

      revalidatePath("/dashboard/wisata/list");
      // Optionally refresh data or perform navigation
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan pada bagian ini",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // End loading state
      setIsOpen(false); // Close the modal
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
