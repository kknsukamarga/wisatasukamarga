"use client";

import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogData {
  slug: string;
}

interface DataTableRowActionsProps<TData extends BlogData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends BlogData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); // Inisialisasi useRouter
  const { toast } = useToast(); // Inisialisasi useToast

  // Fungsi untuk navigasi ke halaman edit
  const handleEdit = () => {
    const slug = row.original.slug;
    if (!slug) {
      toast({
        title: "Error",
        description: "Slug is missing, cannot edit blog.",
        variant: "destructive",
      });
      return;
    }

    // Navigasi ke halaman edit berdasarkan slug
    router.push(`/dashboard/blog-article/edit/${slug}`);
  };

  // Fungsi untuk menghapus blog
  const handleDelete = async () => {
    const slug = row.original.slug;
    if (!slug) {
      toast({
        title: "Error",
        description: "Slug is missing, cannot delete blog.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/blog?slug=${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to delete blog: ${errorData.error}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog deleted successfully.",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      // Optionally, trigger a re-fetch of the data here
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the blog.",
        variant: "destructive",
      });
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
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none hover:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 w-full">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
