function Testimonials() {
  return (
    <div
      className="min-h-screen flex flex-col py-24 md:py:12 items-center justify-center"
      id="testimonials"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full bg-orange-primary z-20 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
          </svg>
        </div>

        <h2
          className={`${TangoSansBold.className} mx-auto text-2xl text-gray text-center gap-2 mt-5`}
        >
          Apa Kata Warlok ???
        </h2>

        <p className="md:w-[60%] w-[90%] mx-auto mt-2">
          Berikut adalah beberapa kalimat dari warga lokal tentang pengalaman
          mereka tentang wisata suka marga.
        </p>
      </div>

      <TestimonialsCard />
    </div>
  );
}

export default Testimonials;

import { TangoSansBold } from "@/app/fonts";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TestimonialsCard() {
  const testimonials = [
    {
      quote:
        "Pekon Sukamarga adalah permata tersembunyi di Lampung Barat, tempat di mana keindahan alam berpadu harmonis dengan kekayaan budaya, memberikan pengalaman wisata yang tak terlupakan bagi siapa pun yang berkunjung.",
      name: "Pak Jaimin",
      designation: "Pratin Pekon Suka Marga",
      src: "/pratin.jpg",
    },
    {
      quote:
        "Wisata Sukamarga menawarkan keindahan alam yang memukau dan pengalaman petualangan tak terlupakan, didukung oleh pemandu profesional yang selalu siap melayani dengan sepenuh hati, memastikan keamanan dan kenyamanan para wisatawan.",
      name: "Pak Abidin",
      designation: "Anggota PokDarWis(Kelompok Sadar Wisata)",
      src: "/pak-abidin.jpg",
    },
    {
      quote:
        "Ekowisata Sukamarga adalah wujud harmoni antara keindahan alam dan pelestarian lingkungan, didukung oleh komitmen kuat pengelola untuk memberikan pengalaman yang nyaman, ramah, dan penuh makna bagi setiap pengunjung.",
      name: "Pak Darto",
      designation: "Ketua Pengelola Danau Asam",
      src: "/pak-darto.jpg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
