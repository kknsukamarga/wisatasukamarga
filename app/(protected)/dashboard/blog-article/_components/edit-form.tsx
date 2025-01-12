"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  title: z.string().min(2, { message: "Title minimal 2 karakter." }),
  coverImage: z
    .any()
    .refine((value) => {
      if (typeof value === "string" && value.startsWith("http")) return true;
      if (Array.isArray(value) && value.length > 0) return true;
      return false;
    }, "Gambar cover diperlukan.")
    .refine((value) => {
      if (typeof value === "string" && value.startsWith("http")) return true;
      if (Array.isArray(value) && value[0]?.size <= MAX_FILE_SIZE) return true;
      return false;
    }, `Ukuran gambar cover tidak boleh melebihi 5MB.`),
  content: z
    .string()
    .min(10, { message: "Konten minimal memiliki 10 karakter." }),
  author: z
    .string()
    .min(2, { message: "Nama pembuat minimal memiliki 2 karakter." }),
  category: z.enum(["TEMPAT_WISATA", "KARYA_UMKM"], {
    errorMap: () => ({ message: "Mohon pilih kategori yang valid." }),
  }),
});

const fetchBlogBySlug = async ({
  queryKey,
}: {
  queryKey: [string, { slug: string }];
}) => {
  const [, { slug }] = queryKey;

  const response = await fetch(`/api/blog?mode=single&slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog data");
  }

  return response.json();
};

export default function EditForm() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [generatedSlug, setGeneratedSlug] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      content: "",
      author: "",
      category: undefined,
    },
  });

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", { slug }],
    queryFn: fetchBlogBySlug,
    enabled: !!slug,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      let finalCoverImage = initialData?.coverImage || "";

      if (Array.isArray(values.coverImage) && values.coverImage.length > 0) {
        const file = values.coverImage[0];
        finalCoverImage = await toBase64(file);
      }

      const updatedData = {
        ...values,
        slug: generatedSlug,
        coverImage: finalCoverImage,
      };

      const response = await fetch(`/api/blog?slug=${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Blog berhasil diperbarui.",
        variant: "default",
      });
      router.push("/dashboard/blog-article/list");
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "Gagal memperbarui blog.",
        variant: "destructive",
      });
    },
  });

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        coverImage: initialData.coverImage,
        content: initialData.content,
        author: initialData.author,
        category: initialData.category,
      });
      setGeneratedSlug(initialData.slug);
    }
  }, [initialData, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.title) {
        setGeneratedSlug(generateSlug(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  if (isLoading) {
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <Skeleton className=" h-8 w-1/3" />
        </CardHeader>
        <CardContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={`space-y-1 ${index == 0 ? "" : "mt-10"} `}
            >
              <Skeleton className=" h-6 w-1/2" />
              <Skeleton className=" h-10 w-full" />
            </div>
          ))}
          <div className="flex justify-end mt-12">
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>Error loading blog: {(error as Error).message}</div>;
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Edit Blog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={Array.isArray(field.value) ? field.value : []}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={MAX_FILE_SIZE}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEMPAT_WISATA">
                        Tempat Wisata
                      </SelectItem>
                      <SelectItem value="KARYA_UMKM">Karya UMKM</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
