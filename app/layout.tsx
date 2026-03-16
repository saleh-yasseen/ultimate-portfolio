import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { getResumeData } from "@/lib/resume-data";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navbar";
import { ThemeInit } from "@/components/theme-init";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const DATA = await getResumeData();

  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? DATA.url ?? "https://example.com";
  const canonicalBaseUrl = rawBaseUrl.replace(/\/$/, "");
  const previewImageUrl = new URL("/me.png", canonicalBaseUrl).toString();
  const twitterHandle = "@saifmohamed_swe";

  const siteTitle = `${DATA.name} — Frontend Engineer`;
  const siteDescription =
    "Frontend Engineer specializing in React, Next.js, and modern web development. Explore my projects, read technical articles, and get in touch.";

  return {
    metadataBase: new URL(canonicalBaseUrl),
    applicationName: "SWEverse",
    title: {
      default: siteTitle,
      template: `%s | ${DATA.name}`,
    },
    description: siteDescription,
    keywords: [
      "Saif Mohamed",
      "Frontend Engineer",
      "React Developer",
      "Next.js",
      "TailwindCSS",
      "Portfolio",
      "Web Developer",
      "Software Engineer",
      "JavaScript",
      "TypeScript",
      "Alexandria Egypt",
    ],
    authors: [{ name: DATA.name, url: canonicalBaseUrl }],
    creator: DATA.name,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: canonicalBaseUrl,
      siteName: "SWEverse",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: previewImageUrl,
          width: 1200,
          height: 630,
          alt: `${DATA.name} — Frontend Engineer portfolio`,
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
      title: siteTitle,
      description: siteDescription,
      card: "summary_large_image",
      images: [previewImageUrl],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: canonicalBaseUrl,
    },
    other: {
      "linkedin:profile": "https://linkedin.com/in/saifmohamedsv",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=JSON.parse(localStorage.getItem("theme-storage"));if(t&&t.state&&t.state.theme==="dark"){document.documentElement.classList.add("dark")}else if(t&&t.state&&t.state.theme==="light"){document.documentElement.classList.remove("dark")}else if(window.matchMedia("(prefers-color-scheme:dark)").matches){document.documentElement.classList.add("dark")}}catch(e){if(window.matchMedia("(prefers-color-scheme:dark)").matches){document.documentElement.classList.add("dark")}}})()`,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeInit />
        <Navigation data={data} />
        <SmoothScrollProvider>
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
