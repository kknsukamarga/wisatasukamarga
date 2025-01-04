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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  coverImage: z
    .any()
    .refine(
      (files) => Array.isArray(files) && files.length > 0,
      "A cover image is required."
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Cover image size must not exceed 5MB.`
    ),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters." }),
});

export default function EditForm() {
  const router = useRouter();
  const { slug } = useParams();
  const [initialData, setInitialData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      coverImage: [],
      content: "",
      author: "",
    },
  });

  useEffect(() => {
    async function fetchBlogData() {
      if (!slug) return;

      try {
        const response = await fetch(`/api/blog?slug=${slug}`);
        if (!response.ok) {
          console.error("Failed to fetch blog data");
          return;
        }

        const data = await response.json();
        setInitialData(data);

        form.reset({
          title: data.title,
          coverImage: [{ name: data.coverImage }],
          content: data.content,
          author: data.author,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }

    fetchBlogData();
  }, [slug, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      let base64Image = "";

      if (values.coverImage && values.coverImage.length > 0) {
        const file = values.coverImage[0];
        base64Image = await toBase64(file);
      }

      const updatedData = {
        title: values.title,
        coverImage: base64Image,
        content: values.content,
        author: values.author,
      };

      const response = await fetch(`/api/blog?slug=${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update blog.");
        return;
      }

      alert("Blog updated successfully!");
      router.push("/dashboard/blog-article/list");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog.");
    } finally {
      setLoading(false);
    }
  }

  function toBase64(file: any) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  if (!initialData) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Edit Blog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      maxSize={MAX_FILE_SIZE}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      theme="snow"
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline"],
                          ["blockquote", "code-block"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image"],
                        ],
                      }}
                      className="max-w-screen-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="flex justify-end w-full">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
