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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; // Import the custom useToast hook
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
    ),
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

interface UMKMFormProps {
  initialData?: Partial<z.infer<typeof formSchema>>;
  pageTitle: string;
}

export default function UMKMForm({ initialData, pageTitle }: UMKMFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: initialData?.product_name || "",
      image: initialData?.image || null,
      price: initialData?.price || 0,
      description: initialData?.description || "",
      wanumber: initialData?.wanumber || "",
      owner: initialData?.owner || "",
      category: initialData?.category || "product",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      let base64Images = [];
      if (values.image && values.image.length > 0) {
        base64Images = await Promise.all(
          values.image.map(async (file: any) => await toBase64(file))
        );
      }

      const formData = {
        product_name: values.product_name,
        images: base64Images, // Send an array of Base64 strings
        price: values.price,
        description: values.description,
        wanumber: values.wanumber,
        owner: values.owner,
        category: values.category,
      };

      const response = await fetch("/api/umkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gagal mengirim UMKM:", errorData);
        toast({
          title: "Gagal",
          description: errorData.error || "Gagal mengirim data UMKM.",
          variant: "destructive",
        });
        return;
      }

      const data = await response.json();
      console.log("UMKM berhasil dibuat:", data);

      // Show success toast
      toast({
        title: "Berhasil",
        description: "UMKM berhasil ditambahkan!",
      });

      form.reset();
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data UMKM:", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat mengirim data UMKM.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    >
                      <option value="product">Product</option>
                      <option value="service">Service</option>
                    </select>
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
                {loading ? "Mengirim..." : "Tambah UMKM"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
