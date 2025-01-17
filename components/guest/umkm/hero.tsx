import { CDN_GITHUB_URL } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="w-full h-[40vh] md:h-[90vh] lg:h-screen overflow-hidden relative grid place-items-center">
      <div
        className="absolute inset-0 z-0 top-0 grayscale brightness-50"
        style={{
          backgroundImage: `url(${CDN_GITHUB_URL}og-image/umkm.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-30" />
    </div>
  );
}
