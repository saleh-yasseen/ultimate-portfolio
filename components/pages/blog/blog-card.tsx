"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { BlogFrontmatter } from "@/lib/types/blog";

interface BlogCardProps {
  slug: string;
  frontmatter: BlogFrontmatter;
  index: number;
}

export function BlogCard({ slug, frontmatter, index }: BlogCardProps) {
  const wordCount = (frontmatter.description || "").split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 40));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group flex flex-col gap-3 rounded-2xl glass-card soft-shadow p-5 transition-all hover:border-primary/30 hover:shadow-primary/5"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>&middot;</span>
          <span>{readTime} min read</span>
        </div>

        <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
          {frontmatter.title}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {frontmatter.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
