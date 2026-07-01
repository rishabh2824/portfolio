import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Header from "@/components/header";
import AppOverlays from "@/components/app-overlays";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: config.title,
    description: config.description.short,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[inter.variable, archivoBlack.variable, "font-display"].join(
        " ",
      )}
      suppressHydrationWarning
    >
      <head>
        {/* The Spline runtime lazy-loads its wasm from unpkg; warm the
            connection early so the 3D scene starts faster. */}
        <link
          rel="preconnect"
          href="https://unpkg.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="scroll-smooth bg-background text-foreground [&_*]:border-border">
        <Providers>
          <Header />
          {children}
          <AppOverlays />
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
