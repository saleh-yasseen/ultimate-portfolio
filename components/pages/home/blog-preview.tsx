"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { ButtonConnect } from "@/components/shared/button-connect";
import { BlogCard } from "@/components/pages/blog/blog-card";
import type { BlogPost } from "@/lib/types/blog";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <SectionReveal>
      <section className="container w-full px-6 py-24 md:py-40 flex flex-col gap-12">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading">
            Latest Articles
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Thoughts on web development and lessons learned from building
            products.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              index={index}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonConnect href="/blog" variant="ghost">
            Read all articles
          </ButtonConnect>
        </div>
      </section>
    </SectionReveal>
  );
}
