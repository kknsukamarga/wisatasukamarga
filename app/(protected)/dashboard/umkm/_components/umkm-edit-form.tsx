"use client";

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
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { redirect } from "next/navigation";

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: "Nama produk minimal 2 karakter.",
  }),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Minimal satu gambar wajib diunggah.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal adalah 5MB.`
    )
    .optional(), // Optional since the user may not want to update the image
  price: z.preprocess(
    (value) => Number(value),
    z.number().int().positive({
      message: "Harga produk harus berupa angka positif.",
    })
  ),
  description: z.string().min(10, {
    message: "Deskripsi minimal 10 karakter.",
  }),
  wanumber: z.string().min(8, {
    message: "Nomor WhatsApp minimal 8 karakter.",
  }),
});

interface UMKMEditFormProps {
  initialData: Partial<z.infer<typeof formSchema>>; // Required initial data for editing
  pageTitle: string; // Page title for the form
  slug: string; // Unique identifier for the UMKM entry
}

export default function UMKMEditForm({
  initialData,
  pageTitle,
  slug,
}: UMKMEditFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [files, setFiles] = useState<File[] | null>(null);
  useEffect(() => {
    const convertAllImagesToFiles = async () => {
      if (initialData.image && Array.isArray(initialData.image)) {
        try {
          const convertedFiles = await Promise.all(
            initialData.image.map(async (imageUrl: string) => {
              const response = await fetch(imageUrl);
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch image: ${response.statusText}`
                );
              }
              const blob = await response.blob();
              const fileName = imageUrl.split("/").pop() || "image.jpg";
              return new File([blob], fileName, { type: blob.type });
            })
          );
          setFiles(convertedFiles); // Update state only once with all files
          form.setValue("image", convertedFiles); // Set form value with converted files
        } catch (error) {
          console.error("Error converting images to files:", error);
        }
      }
    };

    convertAllImagesToFiles();
  }, [initialData.image]);

  useEffect(() => {
    console.log("files", files);
    if (files) {
      form.setValue("image", files);
    }
  }, [files]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: initialData?.product_name || "",
      image: files ? files : [], // Default undefined for FileUploader compatibility
      price: initialData?.price || 0,
      description: initialData?.description || "",
      wanumber: initialData?.wanumber || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      let base64Images = initialData.image || []; // Use existing images if no new ones are uploaded

      // Convert new images to Base64 if provided
      if (values.image && values.image.length > 0) {
        const files = Array.from(values.image); // Ensure it's an array
        const newBase64Images = await Promise.all(
          files.map((file: any) => toBase64(file))
        );
        base64Images = [...newBase64Images]; // Append new images to existing ones
      }

      const formData = {
        product_name: values.product_name,
        image: base64Images, // Send array of Base64 strings
        price: values.price,
        description: values.description,
        wanumber: values.wanumber,
      };

      const response = await fetch(`/api/umkm?slug=${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Terjadi kesalahan saat memperbarui data UMKM.",
          description: "Error: " + errorData.message,
          variant: "default",
        });
        return;
      }

      const data = await response.json();
      toast({
        title: "UMKM berhasil diperbarui.",
        description: "Data UMKM berhasil diperbarui.",
        variant: "default",
      });

      setTimeout(() => {
        window.location.replace("/dashboard/umkm/list");
      }, 2000);
    } catch (error) {
      toast({
        title: "Terjadi kesalahan saat memperbarui data UMKM.",
        description: "Error: " + error,
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  }

  // Helper function to convert a file to Base64
  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama produk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar Produk</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={4}
                      maxSize={MAX_FILE_SIZE}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Produk</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan harga produk"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Produk</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan deskripsi produk"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wanumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nomor WhatsApp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Mengirim..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
