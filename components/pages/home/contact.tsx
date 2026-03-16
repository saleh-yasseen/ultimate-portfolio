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
      <section id="contact" className="container w-full px-6 py-24 md:py-40">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading mb-3">
            Get in Touch
          </h2>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-md">
            Interested in working together or just want to say hi? Drop me a
            message.
          </p>

          {/* Email */}
          <button
            onClick={copyEmail}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 rounded-full border border-border px-4 py-2"
          >
            <IconMail className="w-4 h-4 text-primary" />
            <span>{contact.email}</span>
            {copied ? (
              <IconCheck className="w-3.5 h-3.5 text-primary" />
            ) : (
              <IconCopy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Socials */}
          <div className="flex items-center gap-3 mb-10">
            {Object.values(contact.social).map((item) => (
              <Link
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <Icon name={item.icon} className="w-4 h-4" />
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonConnect
              href="/Saif_Mohamed_Frontend_Engineer.pdf"
              download
              icon={<IconDownload className="w-4 h-4" />}
            >
              Download CV
            </ButtonConnect>
            <ButtonConnect
              href={data.nzmly}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              Book a call
            </ButtonConnect>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Based in {data.location}
          </p>
        </div>
      </section>
    </SectionReveal>
  );
}
