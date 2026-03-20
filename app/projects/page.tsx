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
    title: "Projects",
    description:
      "React and Next.js projects I've built and shipped — from production dashboards to developer tools and open-source experiments.",
  },
};

export default async function ProjectsPage() {
  const DATA = await getResumeData();
  const projects = DATA.projects;

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <section className="container px-6">
        <header className="max-w-2xl space-y-3 pt-10 md:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Selected work
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading">
            Projects I&apos;ve built & shipped
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            From production dashboards and automation tooling to small products
            I built for fun.
          </p>
        </header>

        <SectionReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-3xl glass-card soft-shadow"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {project.active && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Live
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    {project.slug && project.caseStudy && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="shrink-0 text-xs text-primary hover:underline"
                      >
                        Case study
                      </Link>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.links?.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-3 pt-2">
                      {project.links.map((link) => (
                        <Link
                          key={`${project.title}-${link.type}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Icon name={link.icon} className="w-3.5 h-3.5" />
                          <span>{link.type}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-12 flex justify-center">
          <ButtonConnect href="/" variant="ghost">
            Back to home
          </ButtonConnect>
        </div>
      </section>
    </div>
  );
}
