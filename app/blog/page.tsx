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
      <section className="container px-6">
        <header className="max-w-2xl space-y-3 pt-10 md:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Blog
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading">
            Articles & Thoughts
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Writing about web development, software architecture, and lessons
            learned from building products.
          </p>
        </header>

        <SectionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <p className="mt-12 text-center text-muted-foreground">
            No articles yet. Check back soon!
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <ButtonConnect href="/" variant="ghost">
            Back to home
          </ButtonConnect>
        </div>
      </section>
    </div>
  );
}
