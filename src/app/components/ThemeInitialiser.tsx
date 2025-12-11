"use client";

import { useEffect } from "react";
import { DEFAULT_ACCENT_INDEX, THEME_STORAGE_KEY, accentSwatches, hexToRgb } from "@/app/theme";

const clampAccentIndex = (value: unknown) => {
  return typeof value === "number" && value >= 0 && value < accentSwatches.length
    ? value
    : DEFAULT_ACCENT_INDEX;
};

const applyAccent = (accentIndex: number) => {
  const primary = accentSwatches[accentIndex]?.color ?? accentSwatches[DEFAULT_ACCENT_INDEX].color;
  const { r, g, b } = hexToRgb(primary);
  const root = document.documentElement;
  root.style.setProperty("--accent-primary", primary);
  root.style.setProperty("--accent-strong", primary);
  root.style.setProperty("--accent-muted", primary);
  root.style.setProperty("--accent-error", primary);
  root.style.setProperty("--accent-primary-rgb", `${r}, ${g}, ${b}`);
};

export function ThemeInitializer() {
  useEffect(() => {
    const loadAndApply = () => {
      try {
        const raw = localStorage.getItem(THEME_STORAGE_KEY);
        if (!raw) {
          applyAccent(DEFAULT_ACCENT_INDEX);
          return;
        }
        const saved = JSON.parse(raw) as Partial<{ accentIndex: number }>;
        applyAccent(clampAccentIndex(saved.accentIndex));
      } catch (err) {
        console.warn("Failed to apply stored theme", err);
        applyAccent(DEFAULT_ACCENT_INDEX);
      }
    };

    loadAndApply();

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      loadAndApply();
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
}
