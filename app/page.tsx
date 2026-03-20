import ContactSection from "@/components/pages/home/contact";
import { Experience } from "@/components/pages/home/experience";
import { Hero } from "@/components/pages/home/hero";
import { Testimonials } from "@/components/pages/home/testimonials";
import { ProjectsPreview } from "@/components/pages/home/projects";
import { BlogPreview } from "@/components/pages/home/blog-preview";
import { GitHubActivity } from "@/components/pages/home/github-activity";
import { getResumeData } from "@/lib/resume-data";
import { getLatestHashnodePosts } from "@/lib/hashnode";
import { getGitHubRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getResumeData();
  const latestPosts = await getLatestHashnodePosts(3);
  const repos = await getGitHubRepos(process.env.GITHUB_USERNAME || "");
  const resumePath = process.env.RESUME_PDF_PATH || "/resume.pdf";

  return (
    <div className="min-h-screen w-full">
      <Hero data={data} resumePath={resumePath} />
      <GitHubActivity repos={repos} />
      <ProjectsPreview data={data} />
      <Experience data={data} />
      <Testimonials data={data} />
      <BlogPreview posts={latestPosts} />
      <ContactSection data={data} resumePath={resumePath} />
    </div>
  );
}
