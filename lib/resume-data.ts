import { cache } from "react";

interface RawResumeData {
  _id: string;
  name: string;
  initials: string;
  url: string;
  nzmly: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: string[];
  navbar: Array<{
    title: string;
    href: string;
    icon: string;
  }>;
  contact: {
    email: string;
    tel: string;
    social: Record<
      string,
      {
        name: string;
        url: string;
        icon: string;
        navbar: boolean;
      }
    >;
  };
  work: Array<{
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>;
  projects: Array<{
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: Array<{
      type: string;
      href: string;
      icon: string;
    }>;
    image: string;
    video: string;
    slug?: string;
    caseStudy?: {
      heroImage: string;
      problem: string;
      solution: string;
      outcome: string;
      techDetails: string[];
    };
  }>;
  testimonials: Array<{
    quote: string;
    name: string;
    designation: string;
    src: string;
  }>;
}

/**
 * Fetches resume data directly from MongoDB
 * Icons are kept as strings for serialization to client components
 * Use mapIcon() on the client side to convert strings to components
 */
export const getResumeData = cache(async () => {
  const { getResumeData: getFromMongo } = await import("./mongodb");

  try {
    const rawData = (await getFromMongo()) as unknown as RawResumeData;
    return rawData;
  } catch (error) {
    console.error("Error fetching resume data:", error);
    throw error;
  }
});

export type ResumeData = Awaited<ReturnType<typeof getResumeData>>;
