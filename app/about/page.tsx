import { getResumeData } from "@/lib/resume-data";
import { AboutHero } from "@/components/pages/about/about-hero";
import { CareerTimeline } from "@/components/pages/about/career-timeline";
import { SkillsSection } from "@/components/pages/about/skills-section";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ButtonConnect } from "@/components/shared/button-connect";
import { IconDownload } from "@tabler/icons-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Frontend Engineer with expertise in React, Next.js, and TypeScript. Learn about my career journey, skills, and the products I've shipped.",
  openGraph: {
    title: "About Saif Mohamed — Frontend Engineer",
    description:
      "Frontend Engineer with expertise in React, Next.js, and TypeScript. Learn about my career journey, skills, and the products I've shipped.",
  },
};

export default async function AboutPage() {
  const data = await getResumeData();

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <section className="container">
        <AboutHero data={data} />

        <SectionReveal delay={0.2}>
          <CareerTimeline data={data} />
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <SkillsSection skills={data.skills} />
        </SectionReveal>

        {data.education?.length > 0 && (
          <SectionReveal delay={0.4}>
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white font-heading mb-8">
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div
                    key={`${edu.school}-${edu.degree}`}
                    className="glass-card p-6"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {edu.degree}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                      {edu.start} — {edu.end}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        <SectionReveal delay={0.5}>
          <div className="mt-16 flex justify-center gap-4">
            <ButtonConnect
              href="/Saif_Mohamed_Frontend_Engineer.pdf"
              download
              icon={<IconDownload className="w-4 h-4" />}
            >
              Download Resume
            </ButtonConnect>
            <ButtonConnect href="/">Back to home</ButtonConnect>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
