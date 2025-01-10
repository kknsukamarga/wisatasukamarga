"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill, { Quill } from "react-quill";
import imageResize from "quill-image-resize-module-react";
import { useToast } from "@/hooks/use-toast";

import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageResize", imageResize);

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  coverImage: z
    .any()
    .refine((value) => {
      if (typeof value === "string" && value.startsWith("http")) return true;
      if (Array.isArray(value) && value.length > 0) return true;
      return false;
    }, "A cover image is required.")
    .refine((value) => {
      if (typeof value === "string" && value.startsWith("http")) return true;
      if (Array.isArray(value) && value[0]?.size <= MAX_FILE_SIZE) return true;
      return false;
    }, `Cover image size must not exceed 5MB.`),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters." }),
  category: z.enum(["TEMPAT_WISATA", "KARYA_UMKM"], {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
});

export default function EditForm() {
  const router = useRouter();
  const { slug } = useParams();
  const quillRef = useRef(null); // Initialize ref for ReactQuill
  const [initialData, setInitialData] = useState<any | null>(null);
  const [generatedSlug, setGeneratedSlug] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Add state for fetching
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      content: "",
      author: "",
      category: undefined,
    },
  });

  // Fetch existing blog data
  useEffect(() => {
    async function fetchBlogData() {
      if (!slug) return;

      try {
        const response = await fetch(`/api/blog?mode=single&slug=${slug}`);
        if (!response.ok) {
          console.error("Failed to fetch blog data");
          return;
        }

        const data = await response.json();
        setInitialData(data);
        setGeneratedSlug(data.slug);

        form.reset({
          title: data.title,
          coverImage: data.coverImage,
          content: data.content,
          author: data.author,
          category: data.category,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsFetching(false); // Set fetching to false after fetch is complete
      }
    }

    fetchBlogData();
  }, [slug, form]);

  // Generate slug based on title
  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.title) {
        setGeneratedSlug(generateSlug(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      let finalCoverImage = "";

      if (Array.isArray(values.coverImage) && values.coverImage.length > 0) {
        const file = values.coverImage[0];
        finalCoverImage = await toBase64(file);
      } else if (typeof values.coverImage === "string") {
        finalCoverImage = values.coverImage;
      }

      const updatedData = {
        title: values.title,
        slug: generatedSlug,
        coverImage: finalCoverImage,
        content: values.content,
        author: values.author,
        category: values.category,
      };

      const response = await fetch(`/api/blog?slug=${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Gagal",
          description: errorData.error || "Gagal mengupdate blog.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Blog berhasil diupdate.",
      });
      router.push("/dashboard/blog-article/list");
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast({
        title: "Gagal",
        description: "Gagal mengupdate blog.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  const initializeQuill = (el: any) => {
    if (el && !quillRef.current) {
      quillRef.current = el.getEditor();
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];

        try {
          // Upload file ke Cloudinary
          const url = await uploadToCloudinary(file);

          // Pastikan quillRef tidak null sebelum mencoba mengaksesnya
          if (quillRef?.current) {
            // @ts-ignore
            const range = quillRef.current.getSelection(true);
            if (range) {
              // @ts-ignore
              quillRef.current.insertEmbed(range.index, "image", url);
            } else {
              console.warn("No range selected in the editor.");
            }
          } else {
            console.error(
              "quillRef is null. Ensure the editor is properly initialized."
            );
          }
        } catch (error) {
          console.error(
            "Error during image upload or editor manipulation:",
            error
          );
        }
      } else {
        console.warn("No file selected or input is null.");
      }
    };
  }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "contentimage");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.url;
  };

  if (isFetching) {
    // Render skeleton loader while data is being fetched
    return (
      <Card className="mx-auto w-full">
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
          <Skeleton className="h-12 w-32" />
        </CardContent>
      </Card>
    );
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
            <div>
              <FormLabel>Generated Slug</FormLabel>
              <p>{generatedSlug}</p>
            </div>
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={Array.isArray(field.value) ? field.value : []}
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
                      ref={initializeQuill}
                      value={field.value}
                      onChange={field.onChange}
                      theme="snow"
                      modules={{
                        imageResize: {
                          parchment: Quill.import("parchment"),
                          modules: ["Resize", "DisplaySize"],
                        },
                        toolbar: {
                          container: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            [
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                            ],
                            [
                              { list: "ordered" },
                              { list: "bullet" },
                              { indent: "-1" },
                              { indent: "+1" },
                            ],
                            ["link", "image", "video"],
                            ["code-block"],
                            ["clean"],
                          ],
                          handlers: {
                            image: imageHandler,
                          },
                        },
                        clipboard: {
                          matchVisual: false,
                        },
                      }}
                      formats={[
                        "header",
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "list",
                        "bullet",
                        "indent",
                        "link",
                        "image",
                        "video",
                        "code-block",
                      ]}
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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEMPAT_WISATA">
                        Tempat Wisata
                      </SelectItem>
                      <SelectItem value="KARYA_UMKM">Karya UMKM</SelectItem>
                    </SelectContent>
                  </Select>
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
