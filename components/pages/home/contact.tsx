"use client";
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { DATA } from "@/data/resume"; // adjust the path if needed
import Link from "next/link";

export default function ContactSection() {
  const contact = DATA.contact;

  return (
    <section id="contact" className="relative py-24">
      <BackgroundBeamsWithCollision>
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white font-sans tracking-tight mb-6">
            <span className="bg-linear-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              Let&apos;s Connect ⚡
            </span>
          </h2>

          <p className="max-w-2xl text-neutral-700 dark:text-neutral-300 mb-8 text-lg">
            Interested in collaborating or just want to say hi? Reach out
            through any of my socials or drop me an email.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {Object.values(contact.social)
              .filter((item) => !item.navbar)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex items-center gap-2 px-5 py-2 rounded-full
                      border border-neutral-300 dark:border-neutral-700
                      text-neutral-700 dark:text-neutral-200
                      bg-white/60 dark:bg-neutral-800/40
                      hover:bg-neutral-900 hover:text-white transition-all backdrop-blur-sm
                    "
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
          </div>

          <div className="text-neutral-700 dark:text-neutral-300 text-sm space-y-1">
            <p>
              📧{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline underline-offset-2 hover:text-purple-500 transition-colors"
              >
                {contact.email}
              </a>
            </p>
            <p>
              📞{" "}
              <a
                href={`tel:${contact.tel}`}
                className="underline underline-offset-2 hover:text-purple-500 transition-colors"
              >
                {contact.tel}
              </a>
            </p>
            <p className="text-xs text-neutral-500 my-4">
              Based in {DATA.location}
            </p>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}
