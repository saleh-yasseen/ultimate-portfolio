import ContactSection from "@/components/pages/home/contact";
import { Experience } from "@/components/pages/home/experience";
import { Hero } from "@/components/pages/home/hero";
import { Testimonials } from "@/components/pages/home/testimonials";
import { ProjectsPreview } from "@/components/pages/home/projects";
import WorkExperience from "@/components/work-experience";
import { getResumeData } from "@/lib/resume-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getResumeData();

  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      <Hero data={data} />
      {/* Projects */}
      <ProjectsPreview data={data} />
      {/* Experience */}
      <Experience data={data} />
      {/* Testimonials */}
      <Testimonials data={data} />
      {/* Contact */}
      <ContactSection data={data} />
    </div>
  );
}
