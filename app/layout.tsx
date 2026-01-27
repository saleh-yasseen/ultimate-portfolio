import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { getResumeData } from "@/lib/resume-data";
import { cn } from "@/lib/utils";
import { Dock } from "@/components/dock";
import { Navigation } from "@/components/navbar";
import { ThemeInit } from "@/components/theme-init";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const DATA = await getResumeData();

  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? DATA.url ?? "https://example.com";
  const canonicalBaseUrl = rawBaseUrl.replace(/\/$/, "");
  const previewImagePath = "/me.png";
  const previewImageUrl = new URL(previewImagePath, canonicalBaseUrl).toString();
  const twitterHandle = "@saifmohamed_swe";

  return {
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getResumeData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased mx-auto px-6",
          fontSans.variable
        )}
      >
        <ThemeInit />
        <Navigation data={data} />
        {children}
        <Dock data={data} />
      </body>
    </html>
  );
}
