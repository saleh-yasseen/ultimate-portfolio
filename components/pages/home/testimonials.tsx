"use client";

import type { ResumeData } from "@/lib/resume-data";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SectionReveal } from "@/components/ui/section-reveal";

interface TestimonialsProps {
  data: ResumeData;
}

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <SectionReveal>
      <section className="container w-full px-6 py-24 md:py-40">
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading">
            What People Say
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Feedback from colleagues and collaborators.
          </p>
        </div>

        <InfiniteMovingCards
          items={data.testimonials.map((testimonial) => ({
            quote: testimonial.quote,
            name: testimonial.name,
            title: testimonial.designation,
          }))}
          direction="right"
          speed="normal"
        />
      </section>
    </SectionReveal>
  );
}
