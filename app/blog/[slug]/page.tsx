import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/pages/blog/mdx-components";
import { ButtonConnect } from "@/components/shared/button-connect";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: `${post.frontmatter.title} — Saif Mohamed`,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Saif Mohamed"],
      tags: post.frontmatter.tags,
    },
    twitter: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <article className="container max-w-3xl lg:max-w-4xl">
        <header className="pt-10 md:pt-20 space-y-4">
          <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white font-heading leading-[1.15]">
            {post.frontmatter.title}
          </h1>
          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {post.frontmatter.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-200/70 dark:border-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <hr className="border-neutral-200 dark:border-neutral-800" />
        </header>

        <div className="mt-8 article-prose">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    { theme: "github-dark", keepBackground: true },
                  ],
                ],
              },
            }}
          />
        </div>

        <div className="mt-16 flex justify-center gap-4">
          <ButtonConnect href="/blog">All articles</ButtonConnect>
          <ButtonConnect href="/">Back to home</ButtonConnect>
        </div>
      </article>
    </div>
  );
}
