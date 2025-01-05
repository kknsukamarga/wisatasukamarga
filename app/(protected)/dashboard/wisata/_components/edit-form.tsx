"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5000000;

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
  status: z.enum(["Buka", "Tutup", "Pemeliharaan"], {
    message: "Status harus dipilih.",
  }),
});

export default function EditForm({
  initialData,
  pageTitle,
}: {
  initialData: any;
  pageTitle: string;
}) {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      image: [],
      description: initialData?.description || "",
      price: initialData?.price || 0,
      location: initialData?.location || "",
      status: initialData?.status || "Buka",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      let base64Image = initialData?.image || "";

      if (values.image && values.image.length > 0) {
        const file = values.image[0];
        base64Image = await toBase64(file);
      }

      const updatedData = {
        name: values.name,
        image: base64Image,
        description: values.description,
        price: values.price,
        location: values.location,
        status: values.status,
      };

      const response = await fetch(`/api/wisata?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update wisata.");
        return;
      }

      alert("Wisata updated successfully!");
      router.push("/dashboard/wisata/list");
    } catch (error) {
      console.error("Error updating wisata:", error);
      alert("An error occurred while updating the wisata.");
    } finally {
      setLoading(false);
    }
  }

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter wisata name" {...field} />
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
                  <FormLabel>Image</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter wisata description" {...field} />
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter wisata price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter wisata Google Maps link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter status (Buka, Tutup, Pemeliharaan)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Wisata"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
