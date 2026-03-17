import { getHashnodePost, getHashnodePosts } from "@/lib/hashnode";
import { ButtonConnect } from "@/components/shared/button-connect";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/pages/blog/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import { IconArrowLeft, IconClock, IconCalendar } from "@tabler/icons-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getHashnodePosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getHashnodePost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.brief;
  const image = post.ogMetaData?.image || post.coverImage?.url;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Saif Mohamed`,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Saif Mohamed"],
      tags: post.tags.map((t) => t.name),
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      title,
      description,
      card: image ? "summary_large_image" : "summary",
      ...(image && { images: [image] }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getHashnodePost(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <article className="container max-w-3xl px-6">
        {/* Back link */}
        <div className="pt-10 md:pt-16">
          <ButtonConnect href="/blog" variant="ghost" icon={false} className="text-xs px-3 py-1.5 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5">
              <IconArrowLeft className="w-3.5 h-3.5 shrink-0" />
              All articles
            </span>
          </ButtonConnect>
        </div>

        {/* Header */}
        <header className="mt-8 space-y-5">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15] font-heading">
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Image
                src="/me.png"
                alt="Saif Mohamed"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-medium text-foreground">Saif Mohamed</span>
            </div>
            <div className="flex items-center gap-1">
              <IconCalendar className="w-3.5 h-3.5" />
              <time dateTime={post.publishedAt}>{date}</time>
            </div>
            <div className="flex items-center gap-1">
              <IconClock className="w-3.5 h-3.5" />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
          </div>

          {/* Cover image */}
          {post.coverImage?.url && (
            <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-border">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <hr className="border-border" />
        </header>

        {/* Content */}
        <div className="mt-8 article-prose">
          <MDXRemote
            source={post.content.markdown}
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

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Originally published on{" "}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hashnode
              </a>
            </p>
            <div className="flex gap-3">
              <ButtonConnect href="/blog" variant="ghost">
                All articles
              </ButtonConnect>
              <ButtonConnect href="/" variant="ghost">
                Home
              </ButtonConnect>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
