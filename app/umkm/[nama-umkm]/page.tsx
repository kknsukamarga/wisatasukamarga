import { Metadata } from "next";
import { notFound } from "next/navigation";

// Define the type for the dynamic params
interface PageProps {
  params: {
    "nama-umkm": string;
  };
}

// Metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const umkmName = decodeURIComponent(params["nama-umkm"]);
  return {
    title: `UMKM Profile: ${umkmName}`,
    description: `Learn more about ${umkmName}, a thriving UMKM offering amazing products and services.`,
  };
}

// Mock Data Fetching Function
async function fetchUmkmData(namaUmkm: string) {
  console.log(`Fetching data for UMKM: ${namaUmkm}`);
  // Simulated data for a UMKM
  const mockData = {
    name: namaUmkm,
    description: `Discover the amazing journey of ${namaUmkm}, an outstanding UMKM providing high-quality products and services.`,
    about: `${namaUmkm} specializes in offering locally crafted products that cater to the needs of modern consumers while preserving traditional values.`,
    location: "Jl. UMKM No. 123, Jakarta, Indonesia",
    contact: "contact@umkmexample.com | +62 812 3456 7890",
    products: [
      "Handmade Batik Clothing",
      "Organic Coffee Beans",
      "Eco-Friendly Bags",
      "Traditional Snacks",
    ],
    gallery: [
      {
        id: 1,
        url: "https://via.placeholder.com/300",
        alt: `${namaUmkm} Product 1`,
      },
      {
        id: 2,
        url: "https://via.placeholder.com/300",
        alt: `${namaUmkm} Product 2`,
      },
      {
        id: 3,
        url: "https://via.placeholder.com/300",
        alt: `${namaUmkm} Product 3`,
      },
      {
        id: 4,
        url: "https://via.placeholder.com/300",
        alt: `${namaUmkm} Product 4`,
      },
    ],
  };

  // Simulating a delay to mimic API behavior
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return mockData;
}

export default async function Page({ params }: PageProps) {
  const namaUmkm = decodeURIComponent(params["nama-umkm"]);
  const data = await fetchUmkmData(namaUmkm);

  // Handle if data is not found
  if (!data) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
      <p className="text-lg mb-6">{data.description}</p>

      {/* UMKM Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">About {data.name}</h2>
          <p className="mb-4">{data.about}</p>
          <p>
            <strong>Location:</strong> {data.location}
          </p>
          <p>
            <strong>Contact:</strong> {data.contact}
          </p>
        </div>

        {/* Products or Services */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Products & Services</h2>
          <ul className="list-disc ml-6">
            {data.products.map((product: string, index: number) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.gallery.map(
            (image: { id: number; url: string; alt: string }) => (
              <div
                key={image.id}
                className="rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
