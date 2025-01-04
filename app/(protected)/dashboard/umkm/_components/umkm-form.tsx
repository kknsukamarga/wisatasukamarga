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
});

export default function UMKMForm({ pageTitle }: { pageTitle: string }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      image: null,
      price: 0,
      description: "",
      wanumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const formData = {
      product_name: values.product_name,
      image: values.image[0]?.name || "", // Placeholder file name
      price: values.price, // Harga sebagai integer
      description: values.description,
      wanumber: values.wanumber,
    };

    try {
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
        alert(errorData.error || "Gagal mengirim data UMKM.");
        return;
      }

      const data = await response.json();
      console.log("UMKM berhasil dibuat:", data);
      alert("UMKM berhasil ditambahkan!");
      form.reset();
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data UMKM:", error);
      alert("Terjadi kesalahan saat mengirim data UMKM.");
    } finally {
      setLoading(false);
    }
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
