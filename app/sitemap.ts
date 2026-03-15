import type { MetadataRoute } from "next";
import { getResumeData } from "@/lib/resume-data";
import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: MetadataRoute.Sitemap[number]["priority"];
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const DATA = await getResumeData();
  const canonicalBaseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    DATA.url ??
    "https://example.com"
  ).replace(/\/$/, "");
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

  // Case study pages
  const caseStudyPages = DATA.projects
    .filter((p) => p.slug && p.caseStudy)
    .map((p) => ({
      url: new URL(`/projects/${p.slug}`, canonicalBaseUrl).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7 as const,
    }));

  // Blog post pages
  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, canonicalBaseUrl).toString(),
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }));

  return [
    ...primaryRoutes,
    ...ownedProjectPages,
    ...caseStudyPages,
    ...blogPages,
  ];
}
