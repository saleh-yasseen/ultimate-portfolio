"use client";

import type { ResumeData } from "@/lib/resume-data";
import { SectionReveal } from "@/components/ui/section-reveal";
import { motion } from "motion/react";
import Image from "next/image";

interface ExperienceProps {
  data: ResumeData;
}

export function Experience({ data }: ExperienceProps) {
  return (
    <SectionReveal>
      <section
        id="experience"
        className="container w-full px-6 py-24 md:py-40"
      >
        <div className="space-y-3 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading">
            Experience
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Companies I&apos;ve worked with and the roles I&apos;ve held.
          </p>
        </div>

        <div className="grid gap-4">
          {data.work.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.start}`}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-card soft-shadow p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                {job.logoUrl && (
                  <Image
                    src={job.logoUrl}
                    alt={`${job.company} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-xl object-cover ring-1 ring-border shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <h3 className="text-base font-semibold text-foreground">
                      {job.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono shrink-0">
                      {job.start} — {job.end}
                    </span>
                  </div>
                  {job.href ? (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {job.company}
                    </span>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
