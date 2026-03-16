"use client";

import { ButtonConnect } from "@/components/shared/button-connect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import type { ResumeData } from "@/lib/resume-data";
import { motion } from "motion/react";
import { IconDownload, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  data: ResumeData;
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 py-24 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Image
            src="/me.png"
            alt={data.name}
            width={100}
            height={100}
            className="rounded-full ring-2 ring-border"
          />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-2 ring-background text-primary-foreground text-[10px]">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary font-heading"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Frontend Engineer
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground font-heading"
        >
          {data.name}
        </motion.h1>

        {/* Description with text generate effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <TextGenerateEffect
            words={data.description}
            className="max-w-xl"
            textClassName="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
            duration={0.3}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <ButtonConnect
            href="/Saif_Mohamed_Frontend_Engineer.pdf"
            download
            icon={<IconDownload className="w-4 h-4" />}
          >
            Download CV
          </ButtonConnect>
          <ButtonConnect
            href={data.nzmly}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            Book a call
          </ButtonConnect>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex items-center gap-1.5 text-muted-foreground pt-4"
        >
          <IconMapPin className="w-3.5 h-3.5" />
          <Link
            href={data.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-primary transition-colors"
          >
            {data.location}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
