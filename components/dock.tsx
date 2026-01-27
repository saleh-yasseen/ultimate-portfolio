"use client";
import { FloatingDock } from "./ui/floating-dock";
import type { ResumeData } from "@/lib/resume-data";
import { mapIconsInArray } from "@/lib/icon-mapper";
import type { TablerIcon } from "@tabler/icons-react";

interface DockProps {
  data: ResumeData;
}

export function Dock({ data }: DockProps) {
  // Map icon strings to components on the client side
  const navbarWithIcons = mapIconsInArray(data.navbar);
  
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40">
      <FloatingDock items={navbarWithIcons as { title: string; icon: TablerIcon; href: string }[]} />
    </div>
  );
}
