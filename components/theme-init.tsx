"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/theme-store";

export function ThemeInit() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Zustand persist will handle rehydration, but we need to check if no theme is stored
    const stored = localStorage.getItem("theme-storage");
    if (!stored) {
      // No stored theme, use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, [setTheme]);

  return null;
}

