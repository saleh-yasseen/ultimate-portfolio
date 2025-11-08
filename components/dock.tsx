"use client";
import { FloatingDock } from "./ui/floating-dock";
import { DATA } from "@/data/resume";
import { TablerIcon } from "@tabler/icons-react";

export function Dock() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40">
      <FloatingDock items={DATA.navbar as unknown as { title: string; icon: TablerIcon; href: string }[]} />
    </div>
  );
}
