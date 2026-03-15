"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }

      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }

      requestAnimationFrame(() => {
        setStart(true);
      });
    }
  }, [direction, speed]);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[280px] max-w-full shrink-0 rounded-2xl border border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl px-6 py-5 sm:w-[320px] sm:px-8 sm:py-6 md:w-[450px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              {/* Decorative quote mark */}
              <span
                className="absolute top-4 right-6 text-5xl leading-none text-primary/10 font-serif select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <span className="relative z-20 text-sm leading-[1.7] font-normal text-neutral-700 dark:text-neutral-300">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
