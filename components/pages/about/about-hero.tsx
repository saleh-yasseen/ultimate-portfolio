"use client";

import type { ResumeData } from "@/lib/resume-data";
import { SectionReveal } from "@/components/ui/section-reveal";
import Image from "next/image";

interface AboutHeroProps {
  data: ResumeData;
}

export function AboutHero({ data }: AboutHeroProps) {
  return (
    <SectionReveal>
      <div className="pt-10 md:pt-20 flex flex-col items-center text-center gap-6">
        <div className="relative">
          <Image
            src="/me.png"
            alt={data.name}
            width={120}
            height={120}
            className="relative rounded-full ring-2 ring-border"
          />
        </div>

        <div className="flex flex-col items-center space-y-4 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            About me
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading">
            {data.name}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {data.description}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.summary}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.location}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
