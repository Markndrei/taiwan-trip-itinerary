import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC } from "next/font/google";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Taiwan 2027 — Our Journey",
  description: "A curated travel itinerary through the heart of Taiwan, March 2027.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,                       // enables "Add to Home Screen" on iOS Safari
    statusBarStyle: "black-translucent",
    title: "Taiwan 2027",
  },
};

// Viewport is a separate export in Next.js 14+
export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}