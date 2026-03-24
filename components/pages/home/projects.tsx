"use client";

import type { ResumeData } from "@/lib/resume-data";
import { ButtonConnect } from "@/components/shared/button-connect";
import { Icon } from "@/components/ui/icon";
import { SectionReveal } from "@/components/ui/section-reveal";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProjectsPreviewProps {
  data: ResumeData;
}

export function ProjectsPreview({ data }: ProjectsPreviewProps) {
  const projects = data.projects.slice(0, 4);

  return (
    <SectionReveal>
      <section
        id="projects"
        className="relative container w-full px-6 py-24 md:py-40 flex flex-col gap-12"
      >
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading">
            Selected Work
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Projects where I focused on shipping real products and polishing the
            experience.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          {projects.map((project, i) => {
            const hasImage = !!project.image;

            return hasImage ? (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-center"
              >
                {/* Image */}
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl glass-card soft-shadow aspect-[16/10]",
                    i % 2 === 1 && "md:order-2"
                  )}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {project.active && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Live
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex flex-col gap-3",
                    i % 2 === 1 && "md:order-1"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground font-heading">
                      {project.title}
                    </h3>
                    {project.slug && project.caseStudy && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        Case study
                      </Link>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.links?.length > 0 && (
                    <div className="flex items-center gap-4 mt-2">
                      {project.links.map((link) => (
                        <Link
                          key={`${project.title}-${link.type}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Icon name={link.icon} className="w-4 h-4" />
                          <span>{link.type}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ) : (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                }}
                className="group glass-card soft-shadow rounded-2xl p-6 flex flex-col gap-3 transition-shadow hover:border-primary/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground font-heading">
                      {project.title}
                    </h3>
                    {project.active && (
                      <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Live
                      </span>
                    )}
                  </div>
                  {project.slug && project.caseStudy && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      Case study
                    </Link>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links?.length > 0 && (
                  <div className="flex items-center gap-4 mt-2">
                    {project.links.map((link) => (
                      <Link
                        key={`${project.title}-${link.type}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Icon name={link.icon} className="w-4 h-4" />
                        <span>{link.type}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <ButtonConnect href="/projects" variant="ghost">
            See all projects
          </ButtonConnect>
        </div>
      </section>
    </SectionReveal>
  );
}
