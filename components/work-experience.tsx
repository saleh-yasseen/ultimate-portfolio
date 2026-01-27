"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ResumeData } from "@/lib/resume-data";
import { IconCheck } from "@tabler/icons-react";

interface WorkExperienceProps {
  data: ResumeData;
}

export default function WorkExperience({ data }: WorkExperienceProps) {
  const work = data.work;

  // default: first job
  const [active, setActive] = useState<string>(work[0].company);

  const current = work.find((w) => w.company === active)!;

  return (
    <section className="w-full max-w-3xl mx-auto py-4 md:py-12 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12">
      {/* LEFT TABS */}
      <div
        className={`
          no-scrollbar
    flex md:flex-col 
    space-x-2 md:space-x-0 
    space-y-0 md:space-y-2 
    overflow-x-auto md:overflow-visible 
    border-l-0 md:border-l border-primary/20 
    ps-0 md:ps-4 
    no-scrollbar
  `}
      >
        {work.map((job) => {
          const isActive = job.company === active;

          return (
            <button
              key={job.company}
              onClick={() => setActive(job.company)}
              className={`
        flex items-center gap-2 p-2 rounded-lg transition-all text-start
        min-w-[100px] md:min-w-[130px] 
        ${
          isActive
            ? "bg-primary/90 text-white shadow-primary/10 shadow-lg"
            : "hover:bg-primary/10 dark:hover:bg-primary/50"
        }
      `}
            >
              <Image
                src={job.logoUrl}
                alt={`${job.company} logo`}
                width={20}
                height={20}
                className="rounded-full object-cover"
              />

              <span className="text-sm truncate max-w-[80px] block">
                {job.company}
              </span>
            </button>
          );
        })}
      </div>

      {/* RIGHT DETAILS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-2"
        >
          {/* TITLE */}
          <h2 className="text-2xl font-semibold">
            {current.title}{" "}
            <a
              href={current.href}
              target="_blank"
              className="text-primary hover:underline"
            >
              @ {current.company}
            </a>
          </h2>

          {/* DATE */}
          <p className="text-neutral-400">
            {current.start} – {current.end}
          </p>

          {/* LOCATION */}
          <p className="text-neutral-400">{current.location}</p>

          {/* DESCRIPTION → AUTO BULLETS */}
          <ul className="mt-4 space-y-3">
            {current.description.split(". ").map((point, i) => {
              if (!point.trim()) return null;
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary mt-1">
                    <IconCheck className="w-5 h-5 md:w-6 md:h-6" />
                  </span>
                  <p>{point.trim().replace(/\.$/, "")}</p>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
