"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import navData from "@/data/navigation.json";
import React from "react";

type NavLink = { label: string; href: string };

const buildCrumbs = (pathname: string) => {
  const parts = pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => part.toLowerCase() !== "pages");

  const isHome = parts.length === 0 || (parts.length === 1 && parts[0].toLowerCase() === "home");
  return isHome ? ["~"] : ["~", ...parts];
};

export function Navbar() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  const disableViewTransitions = (duration = 800) => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    el.classList.add("vt-disable");
    window.setTimeout(() => {
      el.classList.remove("vt-disable");
    }, duration);
  };

  const handleRootClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHome = pathname === "/" || pathname === "" || pathname === "/home";
    if (isHome) {
      e.preventDefault();
      disableViewTransitions(1000);
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    disableViewTransitions();
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__location">
          {crumbs.map((part, idx) => {
            const isActive = idx === crumbs.length - 1;
            const isRoot = part === "~";
            return (
              <React.Fragment key={`${part}-${idx}`}>
                {isRoot ? (
                  <Link
                    href="/"
                    className={`navbar__crumb${isActive ? " is-active" : ""} navbar__crumb--root`}
                    aria-label="Back to home"
                    data-no-transitions
                    onClick={handleRootClick}
                  >
                    {part}
                  </Link>
                ) : (
                  <span className={`navbar__crumb${isActive ? " is-active" : ""}`}>{part}</span>
                )}
                {idx < crumbs.length && <span className="navbar__divider">/</span>}
              </React.Fragment>
            );
          })}
          <span className="blink" />
        </div>

        <ul className="navbar__links">
          {(navData.links as NavLink[]).map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
