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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus terdiri dari minimal 2 karakter.",
  }),
  image: z.any().refine((files) => files?.length > 0, "Gambar wajib diunggah."),
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
    image: initialData?.image || null,
    description: initialData?.description || "",
    price: initialData?.price || "",
    location: initialData?.location || "",
    status: initialData?.status || "",
  };

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
      let base64Image = "";

      if (values.image && values.image.length > 0) {
        const file = values.image[0];
        base64Image = await toBase64(file);
      }

      // Explicitly convert price to integer
      const formData = {
        name: values.name,
        image: base64Image,
        description: values.description,
        price: parseInt(values.price as unknown as string, 10), // Convert to Int
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
        alert(errorData.error || "Failed to submit wisata.");
        return;
      }

      const data = await response.json();
      console.log("Wisata created successfully:", data);
      alert("Wisata created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting wisata:", error);
      alert("An error occurred while submitting the wisata.");
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

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar</FormLabel>
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
