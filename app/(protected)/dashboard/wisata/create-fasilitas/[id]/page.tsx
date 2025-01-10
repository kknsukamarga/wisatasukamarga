"use client"; // Ensures this file is a Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditForm from "../../_components/edit-form"; // Adjust the path to your `EditForm` component
import FasilitasForm from "../../_components/fasilitas-form";

export default function WisataEditPage() {
  const { id } = useParams(); // Retrieve `id` from the URL
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWisataData() {
      try {
        const response = await fetch(`/api/wisata?id=${id}`);
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWisataData();
    }
  }, [id]);

  return (
    <div>
      <FasilitasForm
        initialData={initialData}
        wisataOptions={[]}
        pageTitle="Tambah Daya Tarik"
      />
    </div>
  );
}
