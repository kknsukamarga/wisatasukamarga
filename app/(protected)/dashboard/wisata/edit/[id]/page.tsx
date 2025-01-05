"use client"; // Ensures this file is a Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditForm from "../../_components/edit-form"; // Adjust the path to your `EditForm` component

export default function WisataEditPage() {
  const { id } = useParams(); // Retrieve `id` from the URL
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWisataData() {
      try {
        const response = await fetch(`/api/wisata?id=${id}`);
        if (!response.ok) {
          console.error("Failed to fetch wisata data");
          return;
        }
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching wisata data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWisataData();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!initialData) {
    return <p>Wisata not found or failed to fetch wisata data.</p>;
  }

  return (
    <div>
      <EditForm initialData={initialData} pageTitle="Edit Wisata" />
    </div>
  );
}
