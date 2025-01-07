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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus terdiri dari minimal 2 karakter.",
  }),
  imageCover: z
    .any()
    .refine((file) => file?.length > 0, "Gambar cover wajib diunggah."),
  images: z
    .array(z.any())
    .refine((files) => files?.length > 0, "Setidaknya satu gambar wajib diunggah."),
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

export default function WisataEditForm({
  initialData,
  pageTitle,
}: {
  initialData: any;
  pageTitle: string;
}) {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast(); // Menggunakan hook useToast
  const [loading, setLoading] = useState(false);

  const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      imageCover: initialData?.imageCover || null,
      images: [],
      description: initialData?.description || "",
      price: initialData?.price || 0,
      location: initialData?.location || "",
      status: initialData?.status || "Buka",
    },
  });

  useEffect(() => {
    const convertAllImagesToFiles = async () => {
      try {
        if (initialData.imageCover) {
          const response = await fetch(initialData.imageCover);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch imageCover: ${response.statusText}`
            );
          }
          const blob = await response.blob();
          const file = Object.assign(
            new File([blob], "cover.jpg", { type: blob.type }),
            {
              preview: initialData.imageCover,
            }
          );
          setImageCoverFile(file);
          form.setValue("imageCover", [file]);
        }

        if (initialData.image && Array.isArray(initialData.image)) {
          const convertedFiles = await Promise.all(
            initialData.image.map(async (imageUrl: string, index: number) => {
              const response = await fetch(imageUrl);
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch image ${index + 1}: ${response.statusText}`
                );
              }
              const blob = await response.blob();
              const fileName = `image-${index + 1}.jpg`;
              return Object.assign(
                new File([blob], fileName, { type: blob.type }),
                {
                  preview: imageUrl,
                }
              );
            })
          );
          setImageFiles(convertedFiles);
          form.setValue("images", convertedFiles);
        }
      } catch (error) {
        console.error("Error converting images to files:", error);
      }
    };

    convertAllImagesToFiles();
  }, [initialData, form]);

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
      const base64ImageCover = imageCoverFile
        ? await toBase64(imageCoverFile)
        : initialData.imageCover;

      const base64Images = await Promise.all(
        imageFiles.map((file) => toBase64(file))
      );

      const updatedData = {
        name: values.name,
        imageCover: base64ImageCover,
        image: base64Images,
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
        toast({
          title: "Gagal Memperbarui Data",
          description: errorData.error || "Terjadi kesalahan.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Wisata berhasil diperbarui!",
        variant: "default",
      });

      setTimeout(() => {
        router.push("/dashboard/wisata/list");
      }, 2000);
    } catch (error) {
      console.error("Error updating wisata:", error);
      toast({
        title: "Gagal Memperbarui Data",
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
              name="imageCover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Cover</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={imageCoverFile ? [imageCoverFile] : []}
                      onValueChange={(files: any) => {
                        setImageCoverFile(files[0] || null);
                        field.onChange(files);
                      }}
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={imageFiles}
                      onValueChange={(files: unknown) => {
                        if (Array.isArray(files)) {
                          const validFiles = files.filter(
                            (file) => file instanceof File
                          ) as File[];
                          setImageFiles(validFiles);
                          field.onChange(validFiles);
                        }
                      }}
                      maxFiles={6}
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
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
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
