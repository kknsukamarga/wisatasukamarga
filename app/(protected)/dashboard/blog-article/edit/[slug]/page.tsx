"use client"; // Tambahkan ini untuk menjadikan file sebagai Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditForm from "../../_components/edit-form";

export default function BlogEditPage() {
  const { slug } = useParams(); // Ambil slug dari URL
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await fetch(`/api/blog?slug=${slug}`);
        if (!response.ok) {
          console.error("Failed to fetch blog data");
          return;
        }
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!initialData) {
    return <p>Blog not found or failed to fetch blog data.</p>;
  }

  return (
    <div>
      <EditForm initialData={initialData} pageTitle="Edit Blog" />
    </div>
  );
}
