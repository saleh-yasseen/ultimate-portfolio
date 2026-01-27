import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconGlobe,
} from "@tabler/icons-react";
import { ComponentType } from "react";

type IconProps = {
  className?: string;
};

const iconMap: Record<string, ComponentType<IconProps>> = {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconGlobe,
};

/**
 * Maps icon name strings from the API to React components
 * @param iconName - The name of the icon (e.g., "IconBrandGithub")
 * @returns The corresponding React component or null if not found
 */
export function mapIcon(iconName: string): ComponentType<IconProps> | null {
  return iconMap[iconName] || null;
}

/**
 * Maps an array of objects with icon properties
 * @param items - Array of items with an 'icon' property (string)
 * @returns Array with icon strings replaced by React components
 */
export function mapIconsInArray<T extends { icon: string }>(
  items: T[]
): Array<Omit<T, "icon"> & { icon: ComponentType<IconProps> | null }> {
  return items.map((item) => ({
    ...item,
    icon: mapIcon(item.icon),
  }));
}

/**
 * Maps icons in a nested social object structure
 */
export function mapSocialIcons<
  T extends Record<string, { icon: string; [key: string]: any }>
>(social: T): Record<string, Omit<T[keyof T], "icon"> & { icon: ComponentType<IconProps> | null }> {
  const result: any = {};
  for (const [key, value] of Object.entries(social)) {
    result[key] = {
      ...value,
      icon: mapIcon(value.icon),
    };
  }
  return result;
}
