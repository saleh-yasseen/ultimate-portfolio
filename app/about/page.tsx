import { getResumeData } from "@/lib/resume-data";
import { AboutHero } from "@/components/pages/about/about-hero";
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
    title: "About — Frontend Engineer",
    description:
      "Frontend Engineer with expertise in React, Next.js, and TypeScript. Learn about my career journey, skills, and the products I've shipped.",
  },
};

export default async function AboutPage() {
  const data = await getResumeData();
  const resumePath = process.env.RESUME_PDF_PATH || "/resume.pdf";

  return (
    <div className="min-h-screen w-full pt-8 pb-24">
      <section className="container px-6">
        <AboutHero data={data} />

        <SectionReveal delay={0.2}>
          <SkillsSection skills={data.skills} />
        </SectionReveal>

        {data.education?.length > 0 && (
          <SectionReveal delay={0.3}>
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading mb-8">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div
                    key={`${edu.school}-${edu.degree}`}
                    className="rounded-2xl glass-card soft-shadow p-5"
                  >
                    <h3 className="text-base font-medium text-foreground">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {edu.start} — {edu.end}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        <SectionReveal delay={0.4}>
          <div className="mt-16 flex justify-center gap-3">
            <ButtonConnect
              href={resumePath}
              download
              icon={<IconDownload className="w-4 h-4" />}
            >
              Download Resume
            </ButtonConnect>
            <ButtonConnect href="/" variant="ghost">
              Back to home
            </ButtonConnect>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
