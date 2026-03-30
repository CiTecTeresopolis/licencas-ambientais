import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CHART_COLORS = [
  "#264653", "#2a9d8f", "#dfa208", "#f4a261", "#e76f51",
  "#8bc34a", "#00bcd4", "#3f51b5", "#673ab7", "#e91e63",
  "#8ab17d", "#b56576", "#588157", "#3d5a80", "#98c1d9",
  "#e0fbfc", "#ee6c4d", "#293241",
];

export function getModalidadeColor(name: string, allModalidades: {name: string}[]) {
  const index = allModalidades.findIndex((m) => m.name === name);
  if (index === -1) return "#cccccc";
  if (index < CHART_COLORS.length) return CHART_COLORS[index];
  return `hsl(${(index * 137.5) % 360}, 65%, 50%)`;
}
