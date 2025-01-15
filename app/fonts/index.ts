import localFont from "next/font/local";
import { Manrope } from "next/font/google";

export const manrope = Manrope({
  weight: ["400"],
  subsets: ["latin-ext"],
});

export const Questa = localFont({
  src: "./questa/Questa_Regular.otf",
  display: "swap",
});

export const TangoSans = localFont({
  src: "./tangosans/TangoSans.ttf",
  display: "swap",
});

export const TangoSansBold = localFont({
  src: "./tangosans/TangoSans_Bold.ttf",
  display: "swap",
});

export const TangoSansItalic = localFont({
  src: "./tangosans/TangoSans_Italic.ttf",
  display: "swap",
});

export const TangoSansBoldItalic = localFont({
  src: "./tangosans/TangoSans_BoldItalic.ttf",
  display: "swap",
});

// export const Questa = localFont({
//   src: "./fonts/questa/Questa_Regular.otf",
//   display: "swap",
// });

// export const TangoSans = localFont({
//   src: "./fonts/tangosans/TangoSans.ttf",
//   display: "swap",
// });

// export const TangoSansBold = localFont({
//   src: "./fonts/tangosans/TangoSans_Bold.ttf",
//   display: "swap",
// });

// export const TangoSansItalic = localFont({
//   src: "./fonts/tangosans/TangoSans_Italic.ttf",
//   display: "swap",
// });

// export const TangoSansBoldItalic = localFont({
//   src: "./fonts/tangosans/TangoSans_BoldItalic.ttf",
//   display: "swap",
// });
