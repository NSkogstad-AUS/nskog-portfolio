"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";

type StickyBackButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export function StickyBackButton({ href, label = "← Back to projects", className = "" }: StickyBackButtonProps) {
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel leaves the top (minus navbar), mark as stuck.
        setStuck(!entry.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="project-detail__sticky-sentinel" aria-hidden />
      <div className={`project-detail__sticky-back ${stuck ? "is-stuck" : ""} ${className}`}>
        <Link href={href} className="project-detail__button project-detail__button--ghost">
          {label}
        </Link>
      </div>
    </>
  );
}
