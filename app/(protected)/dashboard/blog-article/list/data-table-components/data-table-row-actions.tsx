"use client";

import { useRouter } from "next/navigation"; // Gunakan useRouter dari next/navigation
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogData {
  slug: string;
  // Tambahkan field lainnya jika diperlukan
}

interface DataTableRowActionsProps<TData extends BlogData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends BlogData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); // Inisialisasi useRouter

  // Fungsi untuk navigasi ke halaman edit
  const handleEdit = () => {
    const slug = row.original.slug;
    if (!slug) {
      alert("Slug is missing, cannot edit blog.");
      return;
    }

    // Navigasi ke halaman edit berdasarkan slug
    router.push(`/dashboard/blog-article/edit/${slug}`);
  };

  // Fungsi untuk menghapus blog
  const handleDelete = async () => {
    const slug = row.original.slug;
    if (!slug) {
      alert("Slug is missing, cannot delete blog.");
      return;
    }

    if (
      confirm(`Are you sure you want to delete the blog with slug: ${slug}?`)
    ) {
      try {
        const response = await fetch(`/api/blog?slug=${slug}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Failed to delete blog: ${errorData.error}`);
          return;
        }

        alert("Blog deleted successfully.");
        // Optionally, trigger a re-fetch of the data here
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("An error occurred while deleting the blog.");
      }
    }
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
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>{" "}
        {/* Tambahkan onClick */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
