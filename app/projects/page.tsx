import { DATA } from "@/data/resume";
import { ButtonConnect } from "@/components/shared/button-connect";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of projects showcasing my work across products, DX tools, and experiments.",
};

export default function ProjectsPage() {
  const projects = DATA.projects;

  return (
    <div className="min-h-screen w-full pt-8 pb-16">
      <section className="container">
        <header className="max-w-3xl space-y-3 md:space-y-4 pt-4 md:pt-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Selected work
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            Projects I&apos;ve built & shipped
          </h1>
          <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl">
            From production dashboards and automation tooling to small products
            I built for fun, these projects reflect how I think about UX,
            performance, and maintainable frontends.
          </p>
        </header>

        <div className="mt-10 md:mt-12 grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2">
          {projects.map((project) => {
            const repoLink =
              project.links?.find((link) =>
                link.type.toLowerCase().includes("source")
              ) ??
              project.links?.find((link) =>
                link.href.toLowerCase().includes("github.com")
              );

            return (
              <article
                key={project.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200/70 dark:border-neutral-800 bg-gradient-to-b from-white/95 via-white/90 to-neutral-50/90 dark:from-neutral-950 dark:via-neutral-950/95 dark:to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.25)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%)] pointer-events-none" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                      <span
                        className={
                          project.active
                            ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                            : "h-1.5 w-1.5 rounded-full bg-neutral-400"
                        }
                      />
                      <span>{project.active ? "Live" : "Archived"}</span>
                    </div>
                    {project.dates && (
                      <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-neutral-900 shadow-sm dark:bg-neutral-900/90 dark:text-neutral-100">
                        {project.dates}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-4 md:px-6 md:pb-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                        {project.title}
                      </h2>
                      {project.href && (
                        <Link
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1 text-[11px] font-medium text-neutral-800 hover:border-primary/60 hover:text-primary dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200"
                        >
                          Live demo
                        </Link>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {project.technologies?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 text-[11px] md:text-xs text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {project.links?.length ? (
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                      <div className="flex flex-wrap gap-2">
                        {project.links.map((link) => (
                          <Link
                            key={`${project.title}-${link.type}`}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1 text-[11px] font-medium text-neutral-800 hover:border-primary/60 hover:text-primary dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200"
                          >
                            <span className="inline-flex items-center justify-center">
                              {link.icon}
                            </span>
                            <span>{link.type}</span>
                          </Link>
                        ))}
                      </div>

                      {repoLink && (
                        <Link
                          href={repoLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-primary hover:border-primary/70 dark:bg-white dark:text-neutral-900 dark:hover:bg-primary dark:hover:text-white"
                        >
                          <span className="inline-flex items-center justify-center">
                            {repoLink.icon}
                          </span>
                          <span>GitHub repo</span>
                        </Link>
                      )}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonConnect href="/">Back to home</ButtonConnect>
        </div>
      </section>
    </div>
  );
}
