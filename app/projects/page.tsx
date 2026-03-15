import { getResumeData } from "@/lib/resume-data";
import { ButtonConnect } from "@/components/shared/button-connect";
import { Icon } from "@/components/ui/icon";
import { SectionReveal } from "@/components/ui/section-reveal";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "React and Next.js projects I've built and shipped — from production dashboards to developer tools and open-source experiments.",
  openGraph: {
    title: "Projects — Saif Mohamed",
    description:
      "React and Next.js projects I've built and shipped — from production dashboards to developer tools and open-source experiments.",
  },
};

export default async function ProjectsPage() {
  const DATA = await getResumeData();
  const projects = DATA.projects;

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <section className="container">
        <header className="max-w-3xl space-y-3 md:space-y-4 pt-10 md:pt-20">
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

        <SectionReveal>
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
                  className="group relative flex flex-col overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,63,219,0.12)] hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 540px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
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
                        <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                          {project.dates}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-4 md:px-6 md:pb-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        {project.slug && project.caseStudy && (
                          <Link
                            href={`/projects/${project.slug}`}
                            className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                          >
                            Case study
                          </Link>
                        )}
                        {project.href && (
                          <Link
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-full border border-neutral-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Live demo
                          </Link>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {project.technologies?.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-neutral-100/80 dark:bg-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {project.links?.length ? (
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                        <div className="flex flex-wrap gap-2">
                          {project.links.map((link) => (
                            <Link
                              key={`${project.title}-${link.type}`}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary/40 hover:text-primary transition-colors"
                            >
                              <Icon name={link.icon} className="w-3 h-3" />
                              <span>{link.type}</span>
                            </Link>
                          ))}
                        </div>

                        {repoLink && (
                          <Link
                            href={repoLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-primary hover:border-primary/70 dark:bg-white dark:text-neutral-900 dark:hover:bg-primary dark:hover:text-white transition-colors"
                          >
                            <Icon name={repoLink.icon} className="w-3 h-3" />
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
        </SectionReveal>

        <div className="mt-10 flex justify-center">
          <ButtonConnect href="/">Back to home</ButtonConnect>
        </div>
      </section>
    </div>
  );
}
