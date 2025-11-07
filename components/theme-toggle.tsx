"use client";

import { IconSun, IconMoon } from "@tabler/icons-react";
import { useThemeStore } from "@/lib/theme-store";
import { motion } from "motion/react";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export function ThemeToggle({ className = "", size = 20 }: ThemeToggleProps) {
  const { theme, toggle } = useThemeStore();

  return (
    <motion.button
      onClick={toggle}
      className={`flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? (
          <IconSun size={size} className="text-neutral-700 dark:text-neutral-300" />
        ) : (
          <IconMoon size={size} className="text-neutral-700 dark:text-neutral-300" />
        )}
      </motion.div>
    </motion.button>
  );
}

