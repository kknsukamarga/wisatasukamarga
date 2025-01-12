import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "NextJS MongoDB Prisma Starter",
  description: "NextJS MongoDB Prisma Starter with TypeScript and TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <ReactQueryProvider>
          {children}

          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
