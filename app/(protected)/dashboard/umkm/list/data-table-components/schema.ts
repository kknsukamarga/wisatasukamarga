import { z } from "zod";

// Schema for the Umkm data model
export const umkmSchema = z.object({
  id: z.string(),
  product_name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  whatsapp_number: z.string(),
});

export type Umkm = z.infer<typeof umkmSchema>;
