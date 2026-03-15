import ContactSection from "@/components/pages/home/contact";
import { Experience } from "@/components/pages/home/experience";
import { Hero } from "@/components/pages/home/hero";
import { Testimonials } from "@/components/pages/home/testimonials";
import { ProjectsPreview } from "@/components/pages/home/projects";
import { BlogPreview } from "@/components/pages/home/blog-preview";
import { GitHubActivity } from "@/components/pages/home/github-activity";
import WorkExperience from "@/components/work-experience";
import { getResumeData } from "@/lib/resume-data";
import { getLatestPosts } from "@/lib/blog";
import { getGitHubRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getResumeData();
  const latestPosts = getLatestPosts(3);
  const repos = await getGitHubRepos("saifmohamedsv");

  return (
    <div className="min-h-screen w-full">
      <Hero data={data} />
      <hr className="section-divider" />
      <ProjectsPreview data={data} />
      <hr className="section-divider" />
      <GitHubActivity repos={repos} />
      <hr className="section-divider" />
      <Experience data={data} />
      <hr className="section-divider" />
      <Testimonials data={data} />
      <hr className="section-divider" />
      <BlogPreview posts={latestPosts} />
      <hr className="section-divider" />
      <ContactSection data={data} />
    </div>
  );
}
