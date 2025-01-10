import { z } from "zod";

// Schema for FasilitasWisata (nested model)
export const fasilitasWisataSchema = z.object({
  id: z.string().optional(), // Optional for new records
  name: z.string().min(1, "Fasilitas name is required"),
  image: z.string().url("Image must be a valid URL"),
  description: z.string().min(1, "Description is required"),
});

// Schema for Wisata
export const wisataSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number(),
  location: z.string(),
  status: z.enum(["Buka", "Tutup", "Pemeliharaan"]),
  fasilitasWisata: z.array(fasilitasWisataSchema), // Nested facilities
});

export type Wisata = z.infer<typeof wisataSchema>;
