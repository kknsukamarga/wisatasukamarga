import { Questa } from "@/app/fonts";
import { CDN_GITHUB_URL } from "@/lib/utils";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

export const ParralaxBanner = () => {
  const background: BannerLayer = {
    image: `${CDN_GITHUB_URL}wisata/image/DANAU-ASAM-1.JPG`,
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
      <div className="absolute inset-0 flex items-center justify-center z-[70] flex-col text-center -translate-y-10 md:-translate-y-20">
        <p className="text-[#ffffff] lg:text-xl px-4 py-1 rounded-t-sm">
          Detail Wisata
        </p>
        <h1
          className={`text-6xl md:text-8xl text-[#ffffff] px-4 pt-2 pb-4 rounded-md font-bold ${Questa.className}`}
        >
          Desa Suka Marga
        </h1>

        <p className="text-[#ffffff] px-4 pb-1 xl:text-lg rounded-b-sm text-center">
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
    image: `${CDN_GITHUB_URL}parralax/wisata/frame-top.png`,
    translateY: [60, 1],
    opacity: [1, 0.5],
    scale: [0.5, 1.1],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] object-contain md:w-full md:h-full brightness-75",
  };

  const layer2: BannerLayer = {
    image: `${CDN_GITHUB_URL}parralax/wisata/frame-bottom.png`,
    translateY: [50, 1],
    opacity: [1, 0.7],
    scale: [0.5, 1.1],
    shouldAlwaysCompleteAnimation: true,
    className: "h-[700px] object-contain md:w-full md:h-full brightness-75",
  };

  // const layer1: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/danau-asam.png`,
  //   translateY: [60, 1],
  //   opacity: [1, 0.5],
  //   scale: [1, 1.1],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer2: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/danau-lebar.png`,
  //   translateY: [50, 1],
  //   opacity: [1, 0.7],
  //   scale: [1, 1.2],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer3: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/danau-minyak.png`,
  //   translateY: [40, 1],
  //   opacity: [1, 0.6],
  //   scale: [1, 1.05],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer4: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/kawah-merah.png`,
  //   translateY: [10, 1],
  //   opacity: [1, 0.4],
  //   scale: [1, 1.15],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer5: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/keramikan.png`,
  //   translateY: [30, 1],
  //   opacity: [1, 0.8],
  //   scale: [1, 1.05],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer6: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/nirwana.png`,
  //   translateY: [20, 1],
  //   opacity: [1, 0.9],
  //   scale: [1, 1.1],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer7: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/wisata/pasir-kuning.png`,
  //   translateY: [10, 1],
  //   opacity: [1, 0.5],
  //   scale: [1, 1.1],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  // const layer8: BannerLayer = {
  //   image: `${CDN_GITHUB_URL}parralax/8.png`,
  //   translateY: [50, 1],
  //   opacity: [1, 0.3],
  //   scale: [1, 1.2],
  //   shouldAlwaysCompleteAnimation: true,
  //   className: "h-[700px] md:w-full md:h-full brightness-75",
  // };

  return (
    <ParallaxBanner
      layers={[background, headline, layer2, layer1, gradientOverlay]}
      className="aspect-[5/1] bg-gray-900 h-screen"
    />
  );
};
