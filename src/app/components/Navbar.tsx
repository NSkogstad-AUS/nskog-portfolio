"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import navData from "@/data/navigation.json";

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

  return (
    <nav className="navbar">
      <div className="navbar__location">
        {crumbs.map((part, idx) => {
          const isActive = idx === crumbs.length - 1;
          const isRoot = part === "~";
          return (
            <span
              key={`${part}-${idx}`}
              className={`navbar__crumb${isActive ? " is-active" : ""}${isRoot ? " navbar__crumb--root" : ""}`}
            >
              {part}
              {idx < crumbs.length && <span className="navbar__divider">/</span>}
            </span>
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
    </nav>
  );
}
