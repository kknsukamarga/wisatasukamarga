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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus terdiri dari minimal 2 karakter.",
  }),
  imageCover: z.any().refine((file) => file?.length > 0, "Gambar cover wajib diunggah."),
  images: z.array(z.any()).refine((files) => files?.length > 0, "Setidaknya satu gambar wajib diunggah."),
  description: z.string().min(50, {
    message: "Deskripsi harus terdiri dari minimal 50 karakter.",
  }),
  price: z.number().min(1, {
    message: "Harga wajib diisi dan harus lebih besar dari 0.",
  }),
  location: z
    .string()
    .min(2, {
      message: "Lokasi harus berupa tautan Google Maps yang valid.",
    })
    .refine(
      (value) => {
        const googleMapsRegex =
          /^https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)\/.*$/;
        return googleMapsRegex.test(value);
      },
      {
        message: "Lokasi harus berupa tautan Google Maps yang valid.",
      }
    ),
  status: z.enum(["Buka", "Tutup", "Pemeliharaan"]).refine((value) => !!value, {
    message: "Status harus dipilih.",
  }),
});

export default function WisataForm({
  initialData,
  pageTitle,
}: {
  initialData: any | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || "",
    imageCover: initialData?.imageCover || null,
    images: initialData?.images || [],
    description: initialData?.description || "",
    price: initialData?.price || "",
    location: initialData?.location || "",
    status: initialData?.status || "",
  };

  const { toast } = useToast(); // Menggunakan useToast
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const base64Cover = await toBase64(values.imageCover[0]);
      const base64Images = await Promise.all(
        values.images.map((file: File) => toBase64(file))
      );

      const formData = {
        name: values.name,
        imageCover: base64Cover,
        image: base64Images,
        description: values.description,
        price: parseInt(values.price as unknown as string, 10),
        location: values.location,
        status: values.status,
        fasilitasWisata: null,
      };

      const response = await fetch("/api/wisata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to submit wisata:", errorData);
        toast({
          title: "Gagal Mengirim Data",
          description: `Error: ${errorData.message || "Terjadi kesalahan."}`,
          variant: "destructive",
        });
        return;
      }

      const data = await response.json();
      console.log("Wisata created successfully:", data);
      toast({
        title: "Berhasil",
        description: "Wisata berhasil dibuat!",
        variant: "default",
      });

      form.reset();

      // Opsional: Alihkan pengguna setelah 2 detik
      setTimeout(() => {
        window.location.replace("/dashboard/wisata/list");
      }, 2000);
    } catch (error) {
      console.error("Error submitting wisata:", error);
      toast({
        title: "Gagal Mengirim Data",
        description: `Error: ${error}`,
        variant: "destructive",
      });
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
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Nama Wisata..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Cover */}
            <FormField
              control={form.control}
              name="imageCover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar Cover</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024} // 5MB
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar Galeri</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={6}
                      maxSize={5 * 1024 * 1024} // 5MB
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
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Masukkan Deskripsi..." {...field} />
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
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan Harga Tiket Masuk Wisata..."
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Link Lokasi Google Maps..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status Wisata Sekarang..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Buka">Buka</SelectItem>
                      <SelectItem value="Tutup">Tutup</SelectItem>
                      <SelectItem value="Pemeliharaan">Pemeliharaan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Wisata"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
