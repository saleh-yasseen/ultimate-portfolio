import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      <Hero />
      {/* Experience */}
      <Experience />
      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
    </div>
  );
}
