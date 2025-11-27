import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

const canonicalBaseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  DATA.url ??
  "https://example.com"
).replace(/\/$/, "");

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: MetadataRoute.Sitemap[number]["priority"];
}> = [
  {
    path: "/",
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const primaryRoutes = staticRoutes.map((route) => ({
    url: new URL(route.path, canonicalBaseUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const ownedProjectPages = Array.from(
    new Set(
      DATA.projects
        .map((project) => project.href)
        .filter(
          (href) =>
            Boolean(href) &&
            href.startsWith(canonicalBaseUrl) &&
            href !== canonicalBaseUrl
        )
    )
  ).map((href) => ({
    url: href,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  return [...primaryRoutes, ...ownedProjectPages];
}
