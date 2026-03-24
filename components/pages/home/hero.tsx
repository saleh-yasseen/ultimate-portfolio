"use client";

import { ButtonConnect } from "@/components/shared/button-connect";
import type { ResumeData } from "@/lib/resume-data";
import { motion } from "motion/react";
import { IconDownload, IconMapPin, IconTerminal2 } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  data: ResumeData;
  resumePath: string;
}

export function Hero({ data, resumePath }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 py-24 overflow-hidden">
      <div className="container w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
          {/* Text content — left aligned */}
          <div className="flex-1 space-y-6">
            {/* Terminal-style role badge */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-md bg-primary/10 border border-primary/20 px-3 py-1.5 text-sm font-mono text-primary"
            >
              <IconTerminal2 className="w-3.5 h-3.5" />
              <span className="opacity-60">$</span> whoami{" "}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground font-heading"
            >
              {data.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              {data.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <ButtonConnect
                href={resumePath}
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
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-1.5 text-muted-foreground pt-2"
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

          {/* Avatar — right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="shrink-0"
          >
            <Image
              src="/me.png"
              alt={data.name}
              width={320}
              height={320}
              className="w-48 h-48 md:w-72 md:h-72 rounded-2xl ring-1 ring-border object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
