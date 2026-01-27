import type { ResumeData } from "@/lib/resume-data";
import { ButtonConnect } from "@/components/shared/button-connect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import Link from "next/link";

interface ProjectsPreviewProps {
  data: ResumeData;
}

export function ProjectsPreview({ data }: ProjectsPreviewProps) {
  const projects = data.projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="container w-full py-16 md:py-24 flex flex-col gap-10"
    >
      <div className="max-w-3xl space-y-3">
        <TextGenerateEffect
          words="Highlighted Projects"
          textClassName="text-2xl md:text-4xl font-semibold text-black dark:text-white"
        />
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 max-w-xl">
          A selection of projects where I&apos;ve focused on building real
          products, shipping to users, and polishing the developer experience.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-3">
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
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)] opacity-80 pointer-events-none" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                  <span
                    className={
                      project.active
                        ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                        : "h-1.5 w-1.5 rounded-full bg-neutral-400"
                    }
                  />
                  <span>{project.active ? "Live" : "Archived"}</span>
                </div>
                {/* {project.active && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary/80 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                    Live
                  </span>
                )} */}
                {project.dates && (
                  <span className="absolute right-3 bottom-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                    {project.dates}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
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
                              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-primary hover:border-primary/70 dark:bg-white dark:text-neutral-900 dark:hover:bg-primary dark:hover:text-white"
                            >
                              <Icon name={repoLink.icon} className="w-3 h-3" />
                              <span>GitHub repo</span>
                            </Link>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <p className="line-clamp-3 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                  {project.description}
                </p>

                <div className="mt-1 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 text-[11px] md:text-xs text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 px-2.5 py-1 text-[11px] md:text-xs text-neutral-600 dark:text-neutral-400 border border-dashed border-neutral-200/70 dark:border-neutral-800">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <ButtonConnect href="/projects">See all projects</ButtonConnect>
      </div>
    </section>
  );
}
