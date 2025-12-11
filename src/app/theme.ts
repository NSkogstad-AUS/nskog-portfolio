export const themeOptions = ["Latte", "Frappe", "Mocha"] as const;
export type ThemeName = (typeof themeOptions)[number];

export const accentSwatches = [
  { label: "Cider", color: "#e19065" },
  { label: "Apricot", color: "#f4b27c" },
  { label: "Rose", color: "#d57bb3" },
  { label: "Lavender", color: "#c384f2" },
  { label: "Blush", color: "#e25566" },
  { label: "Amber", color: "#d6b762" },
  { label: "Fern", color: "#5ba56e" },
  { label: "Teal", color: "#46c0ad" },
  { label: "Sky", color: "#4fa7de" },
  { label: "Periwinkle", color: "#7f8df0" },
  { label: "Slate", color: "#7397ad" },
  { label: "Coral", color: "#e27a58" },
] as const;

export const THEME_STORAGE_KEY = "home-theme-preferences";

export const isThemeName = (value: string): value is ThemeName =>
  themeOptions.includes(value as ThemeName);

export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const expanded = normalized.length === 3
    ? normalized.split("").map((ch) => ch + ch).join("")
    : normalized;
  const value = parseInt(expanded, 16);
  if (Number.isNaN(value)) {
    return { r: 244, g: 139, b: 102 };
  }
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}
