"use client";
import type { ResumeData } from "@/lib/resume-data";
import { ButtonConnect } from "@/components/shared/button-connect";
import { Icon } from "@/components/ui/icon";
import { SectionReveal } from "@/components/ui/section-reveal";
import { IconMail, IconDownload, IconCopy, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

interface ContactSectionProps {
  data: ResumeData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const contact = data.contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionReveal>
      <section
        id="contact"
        className="relative py-20 md:py-32"
      >
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,63,219,0.06)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
            <span className="bg-linear-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>

          <p className="max-w-xl text-neutral-600 dark:text-neutral-400 mb-10 text-base md:text-lg">
            Interested in collaborating or just want to say hi? Reach out through
            any of my socials or drop me an email.
          </p>

          {/* Social links as icon buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.values(contact.social)
              .filter((item) => !item.navbar)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200/50 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm text-neutral-600 dark:text-neutral-300 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_rgba(100,63,219,0.12)] transition-all"
                >
                  <Icon
                    name={item.icon}
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
          </div>

          {/* Email — copyable */}
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors mb-8 group"
          >
            <IconMail className="w-4 h-4 text-primary" />
            <span className="underline underline-offset-2">{contact.email}</span>
            {copied ? (
              <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <IconCopy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonConnect
              href="/Saif_Mohamed_Frontend_Engineer.pdf"
              download
              icon={<IconDownload className="w-4 h-4" />}
            >
              Download CV
            </ButtonConnect>
            <ButtonConnect href={data.nzmly} target="_blank" rel="noopener noreferrer">
              Book a call
            </ButtonConnect>
          </div>

          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-8">
            Based in {data.location}
          </p>
        </div>
      </section>
    </SectionReveal>
  );
}
