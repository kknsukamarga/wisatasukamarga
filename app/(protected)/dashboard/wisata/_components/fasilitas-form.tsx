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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Validation Schema
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
});

// Helper to convert a file to Base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function FasilitasForm({
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
      name: initialData?.wisata.fasilitasWisata.name || "",
      FasilitasImage: [],
      description: initialData?.wisata.fasilitasWisata.description || "",
    },
  });

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const base64Image =
        values.FasilitasImage.length > 0
          ? await toBase64(values.FasilitasImage[0])
          : "";

      const formData = {
        name: values.name,
        image: base64Image,
        description: values.description,
        wisataId: initialData?.wisata.id,
      };

      const response = await fetch("/api/fasilitas-wisata", {
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
        description: "Daya Tarik berhasil dibuat!",
        variant: "default",
      });
      form.reset();
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
                  <FormLabel>Nama Daya Tarik</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Daya Tarik..." {...field} />
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

            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Mengirimkan..." : "Simpan Fasilitas"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
