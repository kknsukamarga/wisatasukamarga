"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama daya tarik harus terdiri dari minimal 2 karakter.",
  }),
  image: z.any().refine((files) => files?.length > 0, "Gambar wajib diunggah."),
  description: z.string().min(20, {
    message: "Deskripsi harus terdiri dari minimal 20 karakter.",
  }),
  wisataId: z.string().nonempty({
    message: "Wisata terkait harus dipilih.",
  }),
});

export interface Wisata {
  id: string; // Unique identifier
  name: string; // Name of the wisata
  imageCover: string; // URL for the cover image
  description: string; // Description of the wisata
  price: number; // Price in numeric format
  location: string; // Google Maps link
  status: "Buka" | "Tutup" | "Pemeliharaan"; // Enum for status
  image: string[]; // Array of image URLs
  createdAt: string;
  updatedAt: string;
  fasilitasWisata: FasilitasWisata[];
}

export interface FasilitasWisata {
  id: string; // Unique identifier for the fasilitas
  name: string; // Name of the fasilitas
  description?: string; // Optional description for the fasilitas
  image?: string; // Optional image URL for the fasilitas
  createdAt?: string; // Optional creation date in ISO format
  updatedAt?: string; // Optional update date in ISO format
}

export default function FasilitasCard({
  initialData,
  pageTitle,
}: {
  initialData: Wisata[];
  pageTitle: string;
}) {
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
          {initialData.map((wisata) => (
            <Card key={wisata.id} className="shadow-md">
              <CardHeader>
                <Image
                  src={wisata.imageCover}
                  width={300}
                  height={300}
                  alt={wisata.name}
                  className="w-full min-h-48 object-cover"
                />
                <CardTitle className="text-xl font-bold text-center">
                  {wisata.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Link href={`/dashboard/wisata/create-dayatarik/${wisata.id}`}>
                  <Button variant="outline" className="w-full">
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
