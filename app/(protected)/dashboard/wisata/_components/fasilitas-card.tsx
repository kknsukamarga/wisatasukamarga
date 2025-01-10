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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama fasilitas harus terdiri dari minimal 2 karakter.",
  }),
  image: z.any().refine((files) => files?.length > 0, "Gambar wajib diunggah."),
  description: z.string().min(20, {
    message: "Deskripsi harus terdiri dari minimal 20 karakter.",
  }),
  wisataId: z.string().nonempty({
    message: "Wisata terkait harus dipilih.",
  }),
});

export default function FasilitasCard({
  initialData,
  wisataOptions,
  pageTitle,
}: {
  initialData: any | null;
  wisataOptions: { id: string; name: string }[];
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || "",
    image: initialData?.image || null,
    description: initialData?.description || "",
    wisataId: initialData?.wisataId || "",
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

      const formData = {
        name: values.name,
        image: base64Image,
        description: values.description,
        wisataId: values.wisataId,
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
        alert(errorData.error || "Failed to submit fasilitas wisata.");
        return;
      }

      const data = await response.json();
      console.log("Fasilitas wisata created successfully:", data);
      alert("Fasilitas wisata created successfully!");
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
        {/* Display wisata options as cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wisataOptions.map((wisata) => (
            <Card key={wisata.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-center">
                  {wisata.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/wisata/create-fasilitas/${wisata.id}`}>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => form.setValue("wisataId", wisata.id)}
                  >
                    Pilih Wisata
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
