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
  image: z
    .array(z.any())
    .refine((files) => files?.length > 0, "Setidaknya satu gambar wajib diunggah."),
  description: z.string().min(20, {
    message: "Deskripsi harus terdiri dari minimal 50 karakter.",
  }),
});

export default function FasilitasWisataEditForm({
  initialData,
  pageTitle,
}: {
  initialData: any;
  pageTitle: string;
}) {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      image: [],
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    const convertImageToFile = async () => {
      try {
        if (initialData.image && typeof initialData.image === "string") {
          const response = await fetch(initialData.image);
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
          }
          const blob = await response.blob();
          const fileName = `image.jpg`; // You can customize the filename as needed
          const convertedFile = Object.assign(
            new File([blob], fileName, { type: blob.type }),
            { preview: initialData.image }
          );
          setImageFiles([convertedFile]); // Wrap the file in an array to keep compatibility
          console.log([convertedFile]);
          form.setValue("image", [convertedFile]); // Wrap in an array if the form expects an array
        }
      } catch (error) {
        console.error("Error converting image:", error);
      }
    };
  
    convertImageToFile();
  }, [initialData.image, form]);
  
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
      const base64Images = await Promise.all(
        imageFiles.map((file) => toBase64(file))
      );

      const updatedData = {
        name: values.name,
        image: base64Images,
        description: values.description,
      };

      const response = await fetch(`/api/fasilitas-wisata?id=${id}`, {
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
        description: "Fasilitas wisata berhasil diperbarui!",
        variant: "default",
      });

      setTimeout(() => {
        router.push("/dashboard/fasilitas-wisata/list");
      }, 2000);
    } catch (error) {
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
                    <Input placeholder="Masukkan Nama Fasilitas Wisata..." {...field} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan Deskripsi Fasilitas Wisata..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Memperbarui..." : "Perbarui Fasilitas Wisata"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
