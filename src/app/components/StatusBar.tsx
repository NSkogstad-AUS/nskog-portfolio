"use client";

import { useEffect, useState } from "react";

type StatusBarProps = {
  time?: string;
};

export function StatusBar({ time }: StatusBarProps) {
  const [localTime, setLocalTime] = useState("");

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

  return (
    <div className="status-bar">
      <div className="status-bar__group status-bar__group--left">
        <span className="status-bar__copy">© {new Date().getFullYear()} Nicolai Skogstad</span>
      </div>

      <div className="status-bar__group status-bar__group--links" aria-label="External links">
        <a href="mailto:nicolai@skogstad.com" aria-label="Email">
          <i className="bi bi-envelope-fill" aria-hidden="true" />
        </a>
        <a href="https://www.linkedin.com/in/nicolai-skogstad-8333a221b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="bi bi-linkedin" aria-hidden="true" />
        </a>
        <a href="https://github.com/NSkogstad-AUS" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="bi bi-github" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
