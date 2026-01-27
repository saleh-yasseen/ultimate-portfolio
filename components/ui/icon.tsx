"use client";

import { mapIcon } from "@/lib/icon-mapper";

interface IconProps {
  name: string;
  className?: string;
}

/**
 * Client-side component that renders an icon from its string name
 * Must be used in client components since it converts strings to React components
 */
export function Icon({ name, className }: IconProps) {
  const IconComponent = mapIcon(name);
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent className={className} />;
}
