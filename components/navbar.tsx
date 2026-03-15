"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import type { ResumeData } from "@/lib/resume-data";
import { useState } from "react";
import { ButtonConnect } from "./shared/button-connect";
import { useThemeStore } from "@/lib/theme-store";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { mapIcon } from "@/lib/icon-mapper";

interface NavigationProps {
  data: ResumeData;
}

export function Navigation({ data }: NavigationProps) {
  const navItems = [
    {
      name: "Projects",
      link: "/#projects",
    },
    {
      name: "Work Experience",
      link: "/#experience",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggle } = useThemeStore();

  const socialLinks = Object.values(data.contact.social).filter(
    (s) => s.navbar
  );

  return (
    <div className="relative w-full">
      <Navbar className="fixed top-0 md:top-2 z-99">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex flex-shrink-0 items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = mapIcon(social.icon);
              if (!Icon) return null;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="hidden xl:flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-gray-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-gray-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            >
              {theme === "dark" ? (
                <IconSun className="size-4" />
              ) : (
                <IconMoon className="size-4" />
              )}
            </button>
            <ButtonConnect
              href={data.nzmly}
              target="_blank"
              rel="noopener noreferrer"
              icon={false}
              className="px-4 py-2 rounded-lg text-xs"
            >
              Book a call
            </ButtonConnect>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-1">
              <button
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-gray-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              >
                {theme === "dark" ? (
                  <IconSun className="size-4" />
                ) : (
                  <IconMoon className="size-4" />
                )}
              </button>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            id="mobile-nav-menu"
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-3">
              <ButtonConnect
                href={data.nzmly}
                target="_blank"
                rel="noopener noreferrer"
                icon={false}
                className="w-full"
              >
                Book a call
              </ButtonConnect>
            </div>
            <div className="flex w-full items-center justify-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              {socialLinks.map((social) => {
                const Icon = mapIcon(social.icon);
                if (!Icon) return null;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-gray-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
