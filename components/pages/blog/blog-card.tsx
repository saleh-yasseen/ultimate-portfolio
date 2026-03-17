"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import type { HashnodePost } from "@/lib/hashnode";

interface BlogCardProps {
  post: HashnodePost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl glass-card soft-shadow transition-all hover:border-primary/30"
      >
        {/* Cover image */}
        {post.coverImage?.url && (
          <div className="relative aspect-[2/1] overflow-hidden bg-muted">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>{date}</time>
            <span>&middot;</span>
            <span>{post.readTimeInMinutes} min read</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>

          {/* Brief */}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.brief}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
