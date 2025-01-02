import { z } from "zod";

// Schema for the Blog data model
export const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  coverImage: z.string(),
  content: z.string(),
  author: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;
