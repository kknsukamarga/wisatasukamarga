"use client";

import BlogForm from "../_components/blog-form";

export default function BlogCreatePage() {
  return (
    <div>
      <BlogForm initialData={null} pageTitle="Tambah Blog Artikel" />
    </div>
  );
}
