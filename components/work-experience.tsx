"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ResumeData } from "@/lib/resume-data";
import { IconCheck } from "@tabler/icons-react";

interface WorkExperienceProps {
  data: ResumeData;
}

export default function WorkExperience({ data }: WorkExperienceProps) {
  const work = data.work;
  const [active, setActive] = useState<string>(work[0].company);
  const current = work.find((w) => w.company === active)!;

  return (
    <section className="w-full max-w-3xl mx-auto py-4 md:py-12 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12">
      {/* LEFT TABS */}
      <div
        role="tablist"
        aria-label="Work experience"
        className="no-scrollbar flex md:flex-col space-x-2 md:space-x-0 space-y-0 md:space-y-2 overflow-x-auto md:overflow-visible border-l-0 md:border-l border-primary/20 ps-0 md:ps-4"
      >
        {work.map((job) => {
          const isActive = job.company === active;

          return (
            <button
              key={job.company}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${job.company}`}
              onClick={() => setActive(job.company)}
              className={`
                flex items-center gap-2 p-2 rounded-lg transition-all text-start
                min-w-[100px] md:min-w-[130px]
                ${
                  isActive
                    ? "bg-primary/90 text-white shadow-[0_0_20px_rgba(100,63,219,0.2)]"
                    : "hover:bg-primary/10 dark:hover:bg-primary/20"
                }
              `}
            >
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-[10px] font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-primary/10 text-primary dark:bg-primary/20"
                }`}
              >
                {job.company.charAt(0).toUpperCase()}
              </div>

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
          role="tabpanel"
          id={`tabpanel-${active}`}
          aria-label={`${current.company} details`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="glass-card p-5 md:p-6 space-y-3"
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
          <p className="text-neutral-400 text-sm">
            {current.start} – {current.end}
          </p>

          {/* LOCATION */}
          <p className="text-neutral-400 text-sm">{current.location}</p>

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
