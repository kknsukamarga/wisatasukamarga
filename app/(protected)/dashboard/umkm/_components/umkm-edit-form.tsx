"use client";

import { useMutation } from "@tanstack/react-query";
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
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    .optional(),
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
  owner: z.string().min(2, {
    message: "Nama pemilik minimal 2 karakter.",
  }),
  category: z.enum(["service", "product"], {
    required_error: "Kategori harus dipilih.",
  }),
});

interface UMKMEditFormProps {
  initialData: Partial<z.infer<typeof formSchema>>;
  pageTitle: string;
  slug: string;
}

export default function UMKMEditForm({
  initialData,
  pageTitle,
  slug,
}: UMKMEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: initialData?.product_name || "",
      image: files ? files : [],
      price: initialData?.price || 0,
      description: initialData?.description || "",
      wanumber: initialData?.wanumber || "",
      owner: initialData?.owner || "",
      category: initialData?.category || "product",
    },
  });

  useEffect(() => {
    const convertAllImagesToFiles = async () => {
      if (initialData.image && Array.isArray(initialData.image)) {
        try {
          const convertedFiles = await Promise.all(
            initialData.image.map(async (imageUrl: string) => {
              const response = await fetch(imageUrl);
              if (!response.ok) {
                throw new Error(
                  `Gagal mengambil gambar: ${response.statusText}`
                );
              }
              const blob = await response.blob();
              const fileName = imageUrl.split("/").pop() || "image.jpg";
              const file = Object.assign(
                new File([blob], fileName, { type: blob.type }),
                {
                  preview: imageUrl,
                }
              );
              return file;
            })
          );
          setFiles(convertedFiles);
        } catch (error) {
          console.error("Error converting images:", error);
        }
      }
    };

    convertAllImagesToFiles();
  }, [initialData.image]);

  useEffect(() => {
    if (files) {
      form.setValue("image", files);
    }
  }, [files]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      let base64Images = initialData.image || [];

      if (values.image && values.image.length > 0) {
        const files = Array.from(values.image);
        const newBase64Images = await Promise.all(
          files.map((file: any) => toBase64(file))
        );
        base64Images = [...newBase64Images];
      }

      const formData = {
        product_name: values.product_name,
        image: base64Images,
        price: values.price,
        description: values.description,
        wanumber: values.wanumber,
        owner: values.owner,
        category: values.category,
      };

      const response = await fetch(`/api/umkm?slug=${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat memperbarui data UMKM.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Data UMKM berhasil diperbarui.",
        variant: "default",
      });
      setTimeout(() => {
        router.push("/dashboard/umkm/list");
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "Terjadi kesalahan saat memperbarui data UMKM.",
        variant: "default",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

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
            {/* Product Name */}
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
            {/* Owner */}
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pemilik</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama pemilik" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="product">Produk</SelectItem>
                          <SelectItem value="service">Jasa</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image */}
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
            {/* Price */}
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
            {/* Description */}
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
            {/* WhatsApp Number */}
            <FormField
              control={form.control}
              name="wanumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nomor WhatsApp contoh : 0851125399812"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Mengirim..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
