"use client";

import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 mb-4 text-3xl md:text-4xl font-bold text-foreground"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-8 mb-3 text-2xl md:text-3xl font-semibold text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 mb-2 text-xl md:text-2xl font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-4 text-base leading-7 text-neutral-700 dark:text-neutral-300"
      {...props}
    />
  ),
  a: (props) => (
    <Link
      href={props.href ?? "#"}
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    />
  ),
  li: (props) => <li className="text-base leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-primary/40 pl-4 italic text-neutral-600 dark:text-neutral-400"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-sm font-mono text-neutral-800 dark:text-neutral-200"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 p-4 text-sm"
      {...props}
    />
  ),
  img: (props) => (
    <Image
      src={props.src ?? ""}
      alt={props.alt ?? ""}
      width={800}
      height={400}
      className="my-6 rounded-xl border border-neutral-200 dark:border-neutral-800"
    />
  ),
  strong: (props) => (
    <strong
      className="font-semibold text-neutral-900 dark:text-white"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
  ),
};
