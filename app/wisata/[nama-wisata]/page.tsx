import { Metadata } from "next";
import { notFound } from "next/navigation";

// Define the type for the dynamic params
interface PageProps {
  params: {
    "nama-wisata": string;
  };
}

// Metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const wisataName = decodeURIComponent(params["nama-wisata"]);
  return {
    title: `Explore ${wisataName} - Amazing Destinations`,
    description: `Discover everything about ${wisataName}, a must-visit destination with amazing attractions and experiences.`,
  };
}

// Mock Data Fetching Function
async function fetchData(namaWisata: string) {
  console.log(`Fetching mock data for: ${namaWisata}`);

  const mockData = {
    name: namaWisata,
    description: `Discover the breathtaking beauty of ${namaWisata}, a must-visit destination with amazing attractions and unforgettable experiences.`,
    attractions: [
      {
        id: 1,
        name: "Crystal Clear Lake",
        image: "https://via.placeholder.com/300?text=Crystal+Clear+Lake",
      },
      {
        id: 2,
        name: "Majestic Waterfall",
        image: "https://via.placeholder.com/300?text=Majestic+Waterfall",
      },
      {
        id: 3,
        name: "Enchanted Forest",
        image: "https://via.placeholder.com/300?text=Enchanted+Forest",
      },
      {
        id: 4,
        name: "Golden Sunset Beach",
        image: "https://via.placeholder.com/300?text=Golden+Sunset+Beach",
      },
      {
        id: 5,
        name: "Starry Night Campground",
        image: "https://via.placeholder.com/300?text=Starry+Night+Campground",
      },
    ],
  };

  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockData;
}

export default async function Page({ params }: PageProps) {
  const namaWisata = decodeURIComponent(params["nama-wisata"]);
  const data = await fetchData(namaWisata);

  if (!data) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
      <p className="text-lg mb-6">{data.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.attractions.map(
          (attraction: { id: number; name: string; image: string }) => (
            <div
              key={attraction.id}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{attraction.name}</h2>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
