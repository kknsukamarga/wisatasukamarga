"use client";

import Hero from "@/components/guest/hero";
import About from "@/components/guest/about";
import HighlightWisata from "@/components/guest/highlight-wisata";
import HighlightUMKM from "@/components/guest/highlight-umkm";
import Testimonials from "@/components/guest/testimonials";
import InteractiveMap from "@/components/guest/interactive-map";
import Blog from "@/components/guest/blog";
import Contact from "@/components/guest/contact";
import { ReactLenis } from "@/lib/lenis";

function LandingPage() {
  return (
    <ReactLenis root>
      <Hero />
      <About />
      <HighlightWisata />
      <HighlightUMKM />
      <Testimonials />
      <InteractiveMap />
      <Blog />
      <Contact />
    </ReactLenis>
  );
}
export default LandingPage;
