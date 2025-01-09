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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama daya tarik harus terdiri dari minimal 2 karakter.",
  }),
  FasilitasImage: z
    .any()
    .refine((files) => files?.length > 0, "Gambar wajib diunggah."),
  description: z.string().min(20, {
    message: "Deskripsi harus terdiri dari minimal 20 karakter.",
  }),
  //   wisataId: z.string().nonempty({
  //     message: "Wisata terkait harus dipilih.",
  //   }),
});

export default function FasilitasForm({
  initialData,
  wisataOptions,
  pageTitle,
}: {
  initialData: any | null;
  wisataOptions: { id: string; name: string }[];
  pageTitle: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const convertImageUrlToFile = async (imageUrl: string) => {
    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      // Convert the response into a Blob
      const blob = await response.blob();

      // Create a File from the Blob
      const file = new File([blob], "image.jpg", { type: blob.type });

      // Set the File in state
      setFile(file);
    } catch (error) {}
  };

  useEffect(() => {
    if (file) {
      form.setValue("FasilitasImage", [file]); // Update form field with file array
    }
  }, [file]);

  const defaultValues = {
    name: initialData?.wisata.fasilitasWisata.name || "",
    FasilitasImage: file ? [file] : [],
    description: initialData?.wisata.fasilitasWisata.description || "",
    wisataId: initialData?.wisataId || "",
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
      let base64Image = "";

      if (values.FasilitasImage && values.FasilitasImage.length > 0) {
        const file = values.FasilitasImage[0];
        base64Image = await toBase64(file);
      }

      const formData = {
        name: values.name,
        image: base64Image,
        description: values.description,
        wisataId: initialData.wisata.id,
      };

      const response = await fetch("/api/fasilitas-wisata/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Gagal Mengirim Data",
          description: `Error: ${errorData.message || "Terjadi kesalahan."}`,
          variant: "destructive",
        });
        return;
      }

      const data = await response.json();
      toast({
        title: "Berhasil",
        description: "Daya Tarik berhasil dibuat!",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      alert("An error occurred while submitting the fasilitas wisata.");
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
                  <FormLabel>Nama Daya Tarik</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Daya Tarik..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="FasilitasImage"
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

            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Mengirimkan..." : "Simpan Fasilitas"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
