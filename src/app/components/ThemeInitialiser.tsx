"use client";

import { useEffect } from "react";
import {
  DEFAULT_ACCENT_INDEX,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  applyAccent,
  applyTheme,
  isThemeName,
  type ThemeName,
} from "@/app/theme";

export function ThemeInitializer() {
  useEffect(() => {
    const loadAndApply = () => {
      try {
        const raw = localStorage.getItem(THEME_STORAGE_KEY);
        const saved = raw ? (JSON.parse(raw) as Partial<{ accentIndex: number; activeTheme: ThemeName }>) : {};

        applyAccent(typeof saved.accentIndex === "number" ? saved.accentIndex : DEFAULT_ACCENT_INDEX);
        const desiredTheme = saved.activeTheme && isThemeName(saved.activeTheme)
          ? saved.activeTheme
          : DEFAULT_THEME;
        applyTheme(desiredTheme);
      } catch (err) {
        console.warn("Failed to apply stored theme", err);
        applyAccent(DEFAULT_ACCENT_INDEX);
        applyTheme(DEFAULT_THEME);
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
