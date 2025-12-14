"use client";

import { useEffect, useState } from "react";

type StatusBarProps = {
  time?: string;
};

export function StatusBar({ time }: StatusBarProps) {
  const [localTime, setLocalTime] = useState("");
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const bumpViews = async () => {
      const SESSION_KEY = "nskog-portfolio-view-counted";
      try {
        const hasSessionHit =
          typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY);

        const method = hasSessionHit ? "GET" : "POST";
        const res = await fetch("/api/profile-views", { method, cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = (await res.json()) as { total?: number };
        if (!cancelled) setViewCount(typeof json.total === "number" ? json.total : null);
        if (!hasSessionHit && typeof window !== "undefined") {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        }
      } catch (err) {
        console.warn("Could not update profile view count", err);
        if (!cancelled) setViewCount(null);
      }
    };
    bumpViews();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (time) return;
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Melbourne",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(formatter.format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const displayTime = time || localTime;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = "nicolai@skogstad.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn("Could not copy email", err);
    }
  };

  return (
    <div className="status-bar">
      <div className="status-bar__group status-bar__group--left">
        <span className="status-bar__copy">© {new Date().getFullYear()} Nicolai Skogstad</span>
      </div>

      <div className="status-bar__group status-bar__group--links" aria-label="External links">
        <span className="status-bar__views" aria-label="Profile views">
          {viewCount ?? "—"} views
        </span>
        <button
          type="button"
          className="status-bar__copy-btn"
          onClick={handleCopyEmail}
          aria-label="Copy email"
        >
          <span className="status-bar__tooltip">{copied ? "Copied!" : "Copy email"}</span>
          <i className="bi bi-clipboard" aria-hidden="true" />
        </button>
        <a href="mailto:nicolai@skogstad.com" aria-label="Email" className="status-bar__icon-link">
          <span className="status-bar__tooltip">Email</span>
          <i className="bi bi-envelope-fill" aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/nicolai-skogstad-8333a221b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="status-bar__icon-link"
        >
          <span className="status-bar__tooltip">LinkedIn</span>
          <i className="bi bi-linkedin" aria-hidden="true" />
        </a>
        <a
          href="https://github.com/NSkogstad-AUS"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="status-bar__icon-link"
        >
          <span className="status-bar__tooltip">GitHub</span>
          <i className="bi bi-github" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
