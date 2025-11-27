import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Dock } from "@/components/dock";
import { Navigation } from "@/components/navbar";
import { ThemeInit } from "@/components/theme-init";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const rawBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? DATA.url ?? "https://example.com";
const canonicalBaseUrl = rawBaseUrl.replace(/\/$/, "");
const previewImagePath = "/logo.png";
const previewImageUrl = new URL(previewImagePath, canonicalBaseUrl).toString();
const twitterHandle = "@saifmohamed_swe";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBaseUrl),
  applicationName: DATA.name,
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: canonicalBaseUrl,
    siteName: `${DATA.name}`,
    locale: "en_EG",
    type: "website",
    images: [
      {
        url: previewImageUrl,
        width: 1200,
        height: 630,
        alt: `${DATA.name} personal site preview`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    description: DATA.description,
    card: "summary_large_image",
    images: [previewImageUrl],
    creator: twitterHandle,
    site: twitterHandle,
  },
  verification: {
    google: "",
    yandex: "",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased mx-auto px-6",
          fontSans.variable
        )}
      >
        <ThemeInit />
        <Navigation />
        {children}
        <Dock />
      </body>
    </html>
  );
}
