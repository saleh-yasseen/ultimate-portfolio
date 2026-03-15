"use client";

import type { ResumeData } from "@/lib/resume-data";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SectionReveal } from "@/components/ui/section-reveal";
import Image from "next/image";

interface AboutHeroProps {
  data: ResumeData;
}

export function AboutHero({ data }: AboutHeroProps) {
  return (
    <SectionReveal>
      <div className="pt-10 md:pt-20 flex flex-col items-center text-center gap-6">
        <div className="relative shrink-0">
          {/* Glow ring */}
          <div
            className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 via-violet-400/20 to-transparent blur-xl opacity-60"
            aria-hidden="true"
          />
          <Image
            src="/me.png"
            alt={data.name}
            width={160}
            height={160}
            className="relative rounded-full border-2 border-white/20 dark:border-white/10 shadow-[0_0_30px_rgba(100,63,219,0.2)]"
          />
        </div>

        <div className="flex flex-col items-center space-y-4 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            About me
          </p>
          <TextGenerateEffect
            words={data.name}
            textClassName="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white"
          />
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            {data.description}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {data.summary}
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
            <span>{data.location}</span>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
