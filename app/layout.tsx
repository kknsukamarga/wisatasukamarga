import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";
import { CDN_GITHUB_URL } from "@/lib/utils";
import { manrope } from "./fonts";

export const metadata: Metadata = {
  title: "Desa Wisata Suka Marga",
  description:
    "Desa Wisata Sukamarga menawarkan keindahan alam yang memukau dengan kawah keramikan belerang, danau-danau yang indah, hamparan sawah yang hijau, serta suasana pedesaan asri. Cocok untuk destinasi wisata alam dan relaksasi.",
  robots: "index, follow",
  authors: [{ name: "Desa Wisata Suka Marga" }],
  openGraph: {
    type: "website",
    url: "https://wisatasukamarga.my.id/",
    title: "Desa Wisata Suka Marga",
    description:
      "Desa Wisata Sukamarga menawarkan keindahan alam yang memukau dengan kawah keramikan belerang, danau-danau yang indah, hamparan sawah yang hijau, serta suasana pedesaan asri. Cocok untuk destinasi wisata alam dan relaksasi.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/landing-page.png`, // Replace with your actual image URL
        alt: "Desa Wisata Suka Marga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Wisata Suka Marga",
    description:
      "Desa Wisata Sukamarga menawarkan keindahan alam yang memukau dengan kawah keramikan belerang, danau-danau yang indah, hamparan sawah yang hijau, serta suasana pedesaan asri. Cocok untuk destinasi wisata alam dan relaksasi.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/landing-page.png`, // Replace with your actual image URL
        alt: "Desa Wisata Suka Marga",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-YSD9LB84P7"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YSD9LB84P7');
        `}
      </Script>
      <head>
        <meta
          name="google-site-verification"
          content="jJLF3H0UohOmp6uVZN-FzT21xRk0K0qAN561Xeqy1BA"
        />
      </head>
      <body className={`antialiased overflow-x-hidden ${manrope.className}`}>
        <ReactQueryProvider>
          {children}

          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
