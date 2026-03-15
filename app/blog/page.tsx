import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/pages/blog/blog-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ButtonConnect } from "@/components/shared/button-connect";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on React, Next.js, frontend architecture, and lessons from building real products.",
  openGraph: {
    title: "Blog — Saif Mohamed",
    description:
      "Technical articles on React, Next.js, frontend architecture, and lessons from building real products.",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <section className="container">
        <header className="max-w-3xl space-y-3 md:space-y-4 pt-10 md:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Blog
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            Articles & Thoughts
          </h1>
          <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl">
            Writing about web development, software architecture, and lessons
            learned from building products.
          </p>
        </header>

        <SectionReveal>
          <div className="mt-10 md:mt-12 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                frontmatter={post.frontmatter}
                index={index}
              />
            ))}
          </div>
        </SectionReveal>

        {posts.length === 0 && (
          <p className="mt-12 text-center text-neutral-500 dark:text-neutral-400">
            No articles yet. Check back soon!
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <ButtonConnect href="/">Back to home</ButtonConnect>
        </div>
      </section>
    </div>
  );
}
