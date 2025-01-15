"use client";

import About from "@/components/guest/about";
import HighlightWisata from "@/components/guest/highlight-wisata";
import HighlightUMKM from "@/components/guest/highlight-umkm";
import Testimonials from "@/components/guest/testimonials";
import InteractiveMap from "@/components/guest/interactive-map";
import Blog from "@/components/guest/blog";
import { ReactLenis } from "@/lib/lenis";
import { ParralaxBanner } from "./ParralaxBanner";
import { ParallaxProvider } from "react-scroll-parallax";

function LandingPage() {
  return (
    <ParallaxProvider>
      <ReactLenis root>
        <ParralaxBanner />
        <About />
        <HighlightWisata />
        <HighlightUMKM />
        <Testimonials />
        <InteractiveMap />
        <Blog />
      </ReactLenis>
    </ParallaxProvider>
  );
}
export default LandingPage;
