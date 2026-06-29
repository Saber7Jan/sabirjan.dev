import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Asset helper for GitHub Pages
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const base = (import.meta.env.BASE || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return base + cleanPath;
};