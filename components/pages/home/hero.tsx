"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ButtonConnect } from "@/components/shared/button-connect";
import type { ResumeData } from "@/lib/resume-data";
import { motion, AnimatePresence } from "motion/react";
import { IconMapPin, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroProps {
  data: ResumeData;
}

export function Hero({ data }: HeroProps) {
  const typewriterLines = [
    [
      { text: "I'm", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "a", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "Software", className: "text-neutral-900 dark:text-white" },
      { text: "Engineer", className: "text-primary dark:text-primary" },
    ],
    [
      { text: "I", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "build", className: "text-neutral-900 dark:text-white" },
      { text: "web", className: "text-neutral-900 dark:text-white" },
      { text: "applications", className: "text-primary dark:text-primary" },
    ],
    [
      { text: "I", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "love", className: "text-neutral-900 dark:text-white" },
      { text: "helping", className: "text-primary dark:text-primary" },
      { text: "people", className: "text-neutral-900 dark:text-white" },
      { text: "learn", className: "text-primary dark:text-primary" },
    ],
    [
      { text: "I'm", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "very", className: "text-neutral-900 dark:text-white" },
      { text: "active", className: "text-primary dark:text-primary" },
      { text: "on", className: "text-neutral-900 dark:text-white" },
      { text: "LinkedIn", className: "text-primary dark:text-primary" },
    ],
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % typewriterLines.length);
      setKey((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [typewriterLines.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-16 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,63,219,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 font-medium tracking-wide"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 dark:text-white tracking-tight"
        >
          {data.name}
        </motion.h1>

        {/* Rotating Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="min-h-[60px] sm:min-h-[80px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TypewriterEffectSmooth
                words={typewriterLines[currentLineIndex]}
                className="justify-center"
                cursorClassName="bg-primary"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed"
        >
          {data.description}
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <ButtonConnect
            href="/Saif_Mohamed_Frontend_Engineer.pdf"
            download
            icon={<IconDownload className="w-4 h-4" />}
          >
            Download CV
          </ButtonConnect>
          <ButtonConnect href={data.nzmly} target="_blank" rel="noopener noreferrer">
            Book a call
          </ButtonConnect>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 pt-4"
        >
          <IconMapPin className="w-4 h-4" />
          <Link
            href={data.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-primary transition-colors"
          >
            {data.location}
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="pt-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-500"
          >
            <p className="text-xs tracking-widest uppercase">Scroll</p>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
