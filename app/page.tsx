import ContactSection from "@/components/pages/home/contact";
import { Experience } from "@/components/pages/home/experience";
import { Hero } from "@/components/pages/home/hero";
import { Testimonials } from "@/components/pages/home/testimonials";
import { ProjectsPreview } from "@/components/pages/home/projects";
import { BlogPreview } from "@/components/pages/home/blog-preview";
import { GitHubActivity } from "@/components/pages/home/github-activity";
import { MLActivity } from "@/components/pages/home/ml-activity";
import { getResumeData } from "@/lib/resume-data";
import { getLatestHashnodePosts } from "@/lib/hashnode";
import { getGitHubRepos } from "@/lib/github";
import { getKaggleItems } from "@/lib/kaggle";
import { getHFItems } from "@/lib/huggingface";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [data, latestPosts, repos, kaggleItems, hfItems] = await Promise.all([
    getResumeData(),
    getLatestHashnodePosts(3),
    getGitHubRepos(process.env.GITHUB_USERNAME || ""),
    getKaggleItems(
      process.env.KAGGLE_USERNAME || "",
      process.env.KAGGLE_KEY || ""
    ),
    getHFItems(process.env.HUGGING_FACE_USERNAME || ""),
  ]);
  const resumePath = process.env.RESUME_PDF_PATH || "/resume.pdf";

  return (
    <div className="min-h-screen w-full">
      <Hero data={data} resumePath={resumePath} />
      <GitHubActivity repos={repos} />
      <MLActivity kaggleItems={kaggleItems} hfItems={hfItems} />
      <ProjectsPreview data={data} />
      <Experience data={data} />
      <Testimonials data={data} />
      <BlogPreview posts={latestPosts} />
      <ContactSection data={data} resumePath={resumePath} />
    </div>
  );
}
