import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react";

export function Experience() {
  const data = DATA.work.map((work) => {
    const dateRange = `${work.start} - ${work.end}`;

    return {
      title: dateRange,
      content: (
        <div key={work.title} className="w-full">
          <div className="mb-2 flex items-start gap-2 md:gap-4">
            {work.logoUrl && (
              <Link
                href={work.href || "#"}
                target={work.href ? "_blank" : undefined}
                rel={work.href ? "noopener noreferrer" : undefined}
                className="shrink-0"
              >
                <Image
                  src={work.logoUrl}
                  alt={`${work.company} logo`}
                  width={56}
                  height={56}
                  className="h-12 w-12 md:h-14 md:w-14 rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]"
                />
              </Link>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col items-start gap-2">
                <Link
                  href={work.href || "#"}
                  target={work.href ? "_blank" : undefined}
                  rel={work.href ? "noopener noreferrer" : undefined}
                  className="text-sm md:text-lg font-semibold text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {work.company}
                </Link>
                <h4 className="text-xs md:text-base font-medium text-neutral-700 dark:text-neutral-300">
                  {work.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] md:text-sm text-neutral-600 dark:text-neutral-400 mb-3 md:mb-4">
                  <IconMapPin className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                  <span>{work.location}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl">
            {work.description}
          </p>
        </div>
      ),
    };
  });

  return (
    <div className="container relative w-full overflow-clip">
      <Timeline
        data={data}
        title="Work Experience"
        description="A timeline of my professional journey and the companies I've worked with."
      />
    </div>
  );
}
