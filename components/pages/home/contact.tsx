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
  resumePath: string;
}

export default function ContactSection({ data, resumePath }: ContactSectionProps) {
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
        <div className="glass-card soft-shadow p-8 md:p-12 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left */}
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground font-heading">
                Let&apos;s connect
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Open to collaborations, research opportunities, and interesting conversations.
              </p>

              {/* Email */}
              <button
                onClick={copyEmail}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                <IconMail className="w-4 h-4 text-primary" />
                <span>{contact.email}</span>
                {copied ? (
                  <IconCheck className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <IconCopy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start md:items-end gap-4">
              {/* Socials */}
              <div className="flex items-center gap-2">
                {Object.values(contact.social).map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <Icon name={item.icon} className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>

              <ButtonConnect
                href={resumePath}
                download
                icon={<IconDownload className="w-4 h-4" />}
              >
                Download CV
              </ButtonConnect>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
