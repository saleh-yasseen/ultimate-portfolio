"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { DATA } from "@/data/resume";
import { motion, AnimatePresence } from "motion/react";
import { IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const typewriterLines = [
    [
      { text: "I'm", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "a", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "Software", className: "text-neutral-900 dark:text-white" },
      { text: "Engineer", className: "text-blue-500 dark:text-blue-500" },
    ],
    [
      { text: "I", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "build", className: "text-neutral-900 dark:text-white" },
      { text: "amazing", className: "text-blue-500 dark:text-blue-500" },
      { text: "web", className: "text-neutral-900 dark:text-white" },
      { text: "applications", className: "text-blue-500 dark:text-blue-500" },
    ],
    [
      { text: "I", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "love", className: "text-neutral-900 dark:text-white" },
      { text: "helping", className: "text-blue-500 dark:text-blue-500" },
      { text: "people", className: "text-neutral-900 dark:text-white" },
      { text: "learn", className: "text-blue-500 dark:text-blue-500" },
    ],
    [
      { text: "I'm", className: "text-neutral-600 dark:text-neutral-400" },
      { text: "very", className: "text-neutral-900 dark:text-white" },
      { text: "active", className: "text-blue-500 dark:text-blue-500" },
      { text: "on", className: "text-neutral-900 dark:text-white" },
      { text: "LinkedIn", className: "text-blue-500 dark:text-blue-500" },
    ],
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % typewriterLines.length);
      setKey((prev) => prev + 1);
    }, 4000); // Change line every 4 seconds

    return () => clearInterval(interval);
  }, [typewriterLines.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 w-full max-w-4xl"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white"
        >
          {DATA.name}
        </motion.h1>

        {/* Rotating Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center"
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
                cursorClassName="bg-blue-500"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400"
        >
          <IconMapPin className="w-4 h-4" />
          <Link
            href={DATA.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {DATA.location}
          </Link>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
        >
          {DATA.description}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="pt-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400"
          >
            <p className="text-xs sm:text-sm">Scroll Down</p>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
