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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus terdiri dari minimal 2 karakter.",
  }),
  imageCover: z
    .any()
    .refine((file) => file?.length > 0, "Gambar cover wajib diunggah."),
  images: z
    .array(z.any())
    .refine(
      (files) => files?.length > 0,
      "Setidaknya satu gambar wajib diunggah."
    ),
  description: z.string().min(50, {
    message: "Deskripsi harus terdiri dari minimal 50 karakter.",
  }),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: "Harga harus berupa angka yang valid.",
    })
    .transform((value) => Number(value))
    .refine((value) => value > 0, {
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

// Helper to convert files to Base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function WisataForm({
  initialData,
  pageTitle,
}: {
  initialData: any | null;
  pageTitle: string;
}) {
  const { toast } = useToast();

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      imageCover: initialData?.imageCover || null,
      images: initialData?.images || [],
      description: initialData?.description || "",
      price: initialData?.price || "",
      location: initialData?.location || "",
      status: initialData?.status || "Buka",
    },
  });

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const base64Cover = await toBase64(values.imageCover[0]);
      const base64Images = await Promise.all(
        values.images.map((file: File) => toBase64(file))
      );

      const formData = {
        name: values.name,
        imageCover: base64Cover,
        image: base64Images,
        description: values.description,
        price: values.price,
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
        throw new Error(errorData.message || "Terjadi kesalahan.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Wisata berhasil dibuat!",
        variant: "default",
      });
      form.reset();

      // Redirect after success
      setTimeout(() => {
        window.location.replace("/dashboard/wisata/list");
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Gagal Mengirim Data",
        description: error.message || "Terjadi kesalahan.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

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
                      maxSize={MAX_FILE_SIZE}
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
                      maxSize={MAX_FILE_SIZE}
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
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Mengirimkan..." : "Simpan Wisata"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
