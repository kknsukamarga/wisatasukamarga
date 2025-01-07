import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Fungsi untuk mendapatkan blog berdasarkan slug
async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    return null;
  }

  return {
    ...blog,
    createdAt: blog.createdAt.toISOString(), // Konversi DateTime ke ISO string
    updatedAt: blog.updatedAt?.toISOString(), // Konversi updatedAt jika ada
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound(); // Jika blog tidak ditemukan, tampilkan halaman 404
  }

  return (
    <main className="container mx-auto px-6 py-12">
      {/* Tombol Back */}
      <Link
        href="/blogs"
        className="inline-flex items-center mb-4 text-gray-500 hover:underline"
      >
        ← Back
      </Link>

      {/* Detail Blog */}
      <article className="max-w-6xl mx-auto overflow-hidden">
        <div className="space-y-6 my-5 flex flex-col items-center justify-center">
          <Badge className="rounded-md bg-orange-100 text-orange-400">
            WISATA
          </Badge>
          {/* Judul */}
          <h1 className="text-5xl font-bold text-gray-900 text-center">
            {blog.title}
          </h1>
          <p>
            {" "}
            {new Date(
              blog.updatedAt || blog.createdAt
            ).toLocaleDateString()}{" "}
          </p>
        </div>
        {/* Gambar Cover */}
        <div className="relative h-[400px] w-auto rounded-lg overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Judul dan Konten */}
        <div>
          <div className="sticky top">
            <p>Bagikan</p>
          </div>
          <div className="prose prose-lg text-gray-800 text-3xl mx-auto md:mx-20 mt-8">
            {/* Konten */}
            {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque nisi tellus, porttitor in tempor non, dictum eget nunc.
            Vestibulum interdum felis a elit condimentum rutrum. Curabitur
            suscipit lorem et augue consequat, in accumsan odio aliquet. Integer
            congue nibh eu enim elementum tempor. Morbi nec malesuada massa.
            Aliquam id arcu at justo lobortis dapibus et non neque. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Phasellus sodales sapien ante, sodales commodo lectus
            pulvinar sed. Nulla nunc ex, consectetur quis sodales eget, gravida
            in metus. Donec ultrices rutrum tellus non tincidunt. Sed non
            faucibus eros. Cras at sodales nulla. Donec lobortis sagittis
            placerat. Ut aliquam aliquet enim. In lacinia faucibus sem ac
            tristique. Vivamus tortor ante, mattis id feugiat ac, ultrices in
            nisl. Donec sem nibh, rhoncus eget neque non, accumsan consequat
            ante. Ut id dolor vel nisi rhoncus consectetur eget nec urna.
            Suspendisse porta arcu ac finibus feugiat. Proin vitae libero
            sagittis mi luctus mattis. Maecenas vulputate justo id erat euismod
            vehicula. In congue, odio vel ullamcorper imperdiet, ex metus
            vulputate felis, nec auctor metus dui in erat. Morbi eget
            condimentum orci, at posuere eros. Duis auctor mauris nulla, eu
            aliquet est sagittis nec. Praesent vestibulum mollis ornare.
            Suspendisse potenti. Nunc a tincidunt sapien, sodales pretium quam.
            Praesent consequat ex eget rhoncus scelerisque. Donec lobortis
            vulputate sem ac pretium. Mauris pretium nisl ut rutrum volutpat.
            Suspendisse ut magna erat. Proin ipsum ex, volutpat ut gravida eget,
            sodales id sem. Vestibulum sed ligula leo. Cras eu volutpat dolor.
            Morbi ornare gravida ipsum sed varius. Proin feugiat vestibulum
            massa ac dictum. Phasellus ultricies auctor nulla. Aenean mattis
            felis eget pharetra bibendum. Sed tempor, nibh facilisis facilisis
            suscipit, purus dolor consectetur augue, sit amet suscipit velit
            dolor a erat. Cras sit amet dolor dui. Nam ornare augue eu velit
            sagittis consequat. Maecenas feugiat eros in lectus lacinia laoreet.
            Sed ut congue odio, non faucibus nulla. Aenean posuere ligula risus.
            Maecenas faucibus dolor ac semper semper. Fusce tincidunt elit eu
            faucibus laoreet. Nulla facilisi.
          </div>
        </div>
      </article>
    </main>
  );
}
