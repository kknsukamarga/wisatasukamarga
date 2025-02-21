import { Questa } from "@/app/fonts";
import { CDN_GITHUB_URL } from "@/lib/utils";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

export const ParralaxBanner = () => {
  const background: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/3.png`,
    translateY: [10, 50],
    opacity: [1, 0.3],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline: BannerLayer = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center z-[70] flex-col text-center -translate-y-24 md:-translate-y-20">
        <p className="text-gray lg:text-xl px-4 py-1 rounded-t-sm">
          Telusuri Wisata
        </p>
        <h1
          className={`text-6xl md:text-8xl text-gray px-4 pt-2 pb-4 rounded-md font-bold ${Questa.className}`}
        >
          Wisata Suka Marga
        </h1>

        <p className="text-gray bg-white px-4 pb-1 xl:text-lg rounded-sm text-center">
          Desa Wisata Alam, Budaya, dan Pertanian
          <br />
          yang Terbungkus Lingkungan yang Asri
        </p>
      </div>
    ),
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0.7, 1],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 bg-gradient-to-t from-gray to-transparent z-[60]" />
    ),
  };

  // Layer tambahan dengan pengaturan berbeda
  const layer1: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/1.png`,
    translateY: [-30, 1],
    opacity: [1, 0.5],
    scale: [1, 1.1],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer2: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/2.png`,
    translateY: [-10, 1],
    opacity: [1, 0.7],
    scale: [1, 1.2],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer3: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/3.png`,
    translateY: [10, 1],
    opacity: [1, 0.6],
    scale: [1, 1.05],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer4: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/4.png`,
    translateY: [10, 1],
    opacity: [1, 0.4],
    scale: [1, 1.15],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer5: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/5.png`,
    translateY: [20, 1],
    opacity: [1, 0.8],
    scale: [1, 1.05],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer6: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/6.png`,
    translateY: [5, 1],
    opacity: [1, 0.9],
    scale: [1, 1.1],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer7: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/7.png`,
    translateY: [40, 1],
    opacity: [1, 0.5],
    scale: [1, 1.1],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  const layer8: BannerLayer = {
    image: `${CDN_GITHUB_URL}compressed/wisata/parallax/8.png`,
    translateY: [50, 1],
    opacity: [1, 0.3],
    scale: [1, 1.2],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] md:w-full md:h-full",
  };

  return (
    <ParallaxBanner
      layers={[
        background,
        // layer1,
        // layer2,
        // layer3,
        // layer4,
        headline,
        // layer5,
        // layer7,
        layer6,
        // layer8,
        gradientOverlay,
      ]}
      className="aspect-[5/1] bg-gray-900 h-screen"
    />
  );
};
