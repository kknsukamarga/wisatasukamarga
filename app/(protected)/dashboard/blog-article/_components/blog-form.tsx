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
import dynamic from "next/dynamic";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Load the rich text editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(
  () => import("../_components/rich-text-editor"),
  { ssr: false }
);

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  coverImage: z
    .any()
    .refine((files) => files?.length > 0, "A cover image is required."),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
});

export default function BlogForm({
  initialData,
  pageTitle,
}: {
  initialData: any | null;
  pageTitle: string;
}) {
  const defaultValues = {
    title: initialData?.title || "",
    coverImage: initialData?.coverImage || "",
    content: initialData?.content || "",
    author: initialData?.author || "",
  };

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    // Prepare form data
    const formData = {
      title: values.title,
      coverImage: values.coverImage[0]?.name || "", // Use file name as placeholder
      content: values.content,
      author: values.author,
    };

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to submit blog:", errorData);
        alert(errorData.error || "Failed to submit blog.");
        return;
      }

      const data = await response.json();
      console.log("Blog created successfully:", data);
      alert("Blog created successfully!");
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred while submitting the blog.");
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
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
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

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
