"use client";

import type { ResumeData } from "@/lib/resume-data";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface TestimonialsProps {
  data: ResumeData;
}

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <div
      id="testimonials"
      className="container min-h-screen flex items-center justify-center w-full py-12 md:py-16 px-4"
    >
      <div className="w-full">
        <div className="mb-12">
          <TextGenerateEffect
            words={"Testimonials"}
            textClassName="text-2xl md:text-4xl mb-4 text-black dark:text-white max-w-4xl"
          />
          <TextGenerateEffect
            words={`What people say about working with me and my contributions on LinkedIn.`}
            textClassName="font-normal text-neutral-700 dark:text-neutral-300 text-sm max-w-sm"
          />
        </div>
        <InfiniteMovingCards
          items={data.testimonials.map((testimonial) => ({
            ...testimonial,
            quote: testimonial.quote,
            name: testimonial.name,
            title: testimonial.designation,
            image: testimonial.src,
          }))}
          direction="right"
          speed="normal"
        />
      </div>
    </div>
  );
}
