"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation"; // Import Next.js router
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the data structure
interface UMKMData {
  slug: string; // Ensure 'slug' exists as a property
  [key: string]: any; // Allow other properties dynamically
}

interface DataTableRowActionsProps {
  row: Row<UMKMData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();
  const { slug } = row.original;

  const handleDelete = async () => {
    if (!slug) {
      alert("Error: Slug not found for this row.");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete this UMKM?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/umkm?slug=${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete UMKM.");
      }

      alert("UMKM deleted successfully.");
      // Optionally, trigger a data refresh or navigation
    } catch (error) {
      console.error("Error deleting UMKM:", error);
      alert("An error occurred while deleting the UMKM.");
    }
  };

  const handleEdit = () => {
    if (!slug) {
      alert("Error: Slug not found for this row.");
      return;
    }

    router.push(`/dashboard/umkm/edit/${slug}`);
  };

  return (
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
  );
}
