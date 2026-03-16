"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import Image from "next/image";

interface CaseStudyProject {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  caseStudy: {
    heroImage: string;
    problem: string;
    solution: string;
    outcome: string;
    techDetails: string[];
  };
}

interface CaseStudyProps {
  project: CaseStudyProject;
}

export function CaseStudy({ project }: CaseStudyProps) {
  const { caseStudy } = project;

  return (
    <div className="pt-10 md:pt-20">
      <SectionReveal>
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Case Study
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </header>
      </SectionReveal>

      {caseStudy.heroImage && (
        <SectionReveal delay={0.1}>
          <div className="relative mt-10 h-64 md:h-96 overflow-hidden rounded-xl border border-border">
            <Image
              src={caseStudy.heroImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </SectionReveal>
      )}

      <div className="mt-12 space-y-12">
        <SectionReveal delay={0.2}>
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              The Problem
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              The Solution
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              The Outcome
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {caseStudy.outcome}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techDetails.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
