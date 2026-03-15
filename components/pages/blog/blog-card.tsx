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
  // Estimate reading time from word count (rough: title + description length)
  const wordCount = (frontmatter.description || "").split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 40));

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,63,219,0.12)] hover:-translate-y-1"
    >
      <Link href={`/blog/${slug}`} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-3 px-5 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-neutral-300 dark:text-neutral-600">&middot;</span>
            <span>{readTime} min read</span>
          </div>

          <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
            {frontmatter.title}
          </h3>

          <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            {frontmatter.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100/80 dark:bg-white/5 px-2.5 py-1 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
