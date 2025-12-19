"use client";
import "./home.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "next-view-transitions";
import BounceCards from "@/Imported Components/BounceCards";
import type { RecentCommit as RecentCommitData } from "@/lib/github";
import {
  THEME_STORAGE_KEY,
  accentSwatches,
  DEFAULT_ACCENT_INDEX,
  DEFAULT_THEME,
  applyAccent,
  applyTheme,
  isThemeName,
  themeOptions,
  type ThemeName,
} from "@/app/theme";
import { StatusBar } from "@/app/components/StatusBar";
import { ProjectCardShowcase } from "../projects/ProjectCardShowcase";
import type { RepoCardData } from "../projects/project-data";
import { findProject } from "../projects/project-data";

type BaseEntry = {
  period: string;
  bullets: string[];
  logo?: string;
  tag?: string;
  acronym?: string;
  fullName?: string;
};
type ExpEntry = BaseEntry & { kind: "experience"; company: string; role: string };
type EduEntry  = BaseEntry & { kind: "edu"; school: string; program: string };

const bounceImages = [
  "/assets/pf-1.JPG",
  "/assets/pf-3.JPG",
  "/assets/pf-2.JPG",
];

type StoredThemePrefs = Partial<{
  activeTheme: ThemeName;
  accentIndex: number;
  bgEffectEnabled: boolean;
}>;

const readStoredThemePrefs = (): StoredThemePrefs => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredThemePrefs) : {};
  } catch (err) {
    console.warn("Failed to read stored theme settings", err);
    return {};
  }
};

const MAP_LAT = -37.8142;
const MAP_LON = 144.9632;
const MAP_ZOOM = 12;
const MAPTILER_FALLBACK_KEY = "ZpAYrePmq0WCnHV4xIgm";

const pinImages = [
  { src: "/assets/pi-image.PNG", alt: "Pinterest inspiration 1" },
];

const expEntries: ExpEntry[] = [
  {
    kind: "experience",
    company: "CISSA",
    role: "Industry Officer",
    period: "Mar 2025 – Present",
    bullets: [
      "Led communications with key industry partners, including Atlassian, Xero, and EY, strengthening relationships and securing opportunities for members.",
      "Planned and executed workshops and panels, driving student involvement in career development activities within a team of 90+ members.",
    ],
    logo: "/assets/lg-cissa.png",
    acronym: "CISSA",
    fullName: "Computing and Information Systems Students Association",
  },
  {
    kind: "experience",
    company: "Google Developer Student Clubs",
    role: "Event Officer / Front-End Software Engineer",
    period: "Jan 2025 – Jun 2025",
    bullets: [
      "Built responsive event pages with tools like NodeJS, React, Javascript, Typescript, improving discoverability and sign-ups.",
      "Organised and managed technical workshops, hackathons, and speaker events to foster learning within the student community.",
    ],
    logo: "/assets/lg-gdsc.png",
    acronym: "Google DSC",
    fullName: "Google Developer Student Clubs - The University of Melbourne",
  },
  {
    kind: "experience",
    company: "Melbourne Space Program (MSP)",
    role: "Back-End Software Engineer",
    period: "Jan 2025 – Jun 2025",
    bullets: [
      "Documented software designs and contributed to tech reports for internal and external stakeholders.",
      "Developed and tested software components for a humanoid robotics project, focusing on control algorithms and system integration.",
    ],
    logo: "/assets/lg-msp.png",
  },
  {
    kind: "experience",
    company: "EMU5 - VEX U Robotics at Unimelb",
    role: "Back-End Software Engineer",
    period: "Aug 2024 – Apr 2025",
    bullets: [
      "Designed and iterated on robust hardware architectures for competitive robotics systems.",
      "Developed and optimised back-end software solutions to enhance team performance and efficiency.",
    ],
    logo: "/assets/lg-emu5.png",
  },
  {
    kind: "experience",
    company: "Unimelb Rover Team (URT)",
    role: "Full Stack Software Engineer",
    period: "Apr 2024 – Mar 2025",
    bullets: [
      "Helped in development of seamless operation and performance optimisation of the rover.",
      "Contributed to full-stack development, integrating front-end interfaces with back-end architecture.",
    ],
    logo: "/assets/lg-urt.jpg",
  },
  {
    kind: "experience",
    company: "Melbourne University Racing Motorsports",
    role: "Chassis Engineer / Front-End Software Engineer / Budget Officer",
    period: "Jan 2024 – Nov 2024",
    bullets: [
      "Designed and optimised chassis components using advanced CAD tools for high-performance vehicles.",
      "Developed Python-based tools to automate chassis design calculations and performance analysis, integrating CAD outputs and test data to support faster, data-driven design decisions.",
    ],
    logo: "/assets/lg-mur.jpg",
    acronym: "MUR Motorsports",
    fullName: "Melbourne University Racing Motorsports",
  },
];

const educationEntries: EduEntry[] = [
  {
    kind: "edu",
    school: "University of Melbourne",
    program: "Master of Software Engineering",
    period: "2025-Present",
    bullets: [
      "Coursework in distributed systems, software architecture, and AI",
    ],
    logo: "/assets/lg-unimelb.png",
  },
  {
    kind: "edu",
    school: "University of Melbourne",
    program: "Bachelor of Computing & Software Systems",
    period: "2023 – 2025",
    bullets: [
      "Focused on full-stack development and mobile applications",
    ],
    logo: "/assets/lg-unimelb.png",
  },
];

const tabs = [
  { key: "experience", label: "Experience", list: expEntries },
  { key: "edu", label: "Education", list: educationEntries },
] as const;

type FeaturedProject = {
  slug: string;
  owner: string;
  repo: string;
  title: string;
  customDescription: string;
  fallback: RepoCardData;
  tags: string[];
};

const featuredProjects: FeaturedProject[] = [
  {
    slug: "blackline-forensics",
    owner: "NSkogstad-AUS",
    repo: "Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
    title: "Blackline Forensics",
    customDescription: "A machine learning deep-fake website developed in a team of 5 for a client",
    fallback: {
      name: "Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
      fullName: "NSkogstad-AUS/Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
      stars: 1,
      description: "Weighs the soul of incoming HTTP requests to stop AI crawlers",
      contributors: [],
    },
    tags: ["ml", "cv", "web", "team-project"],
  },
  {
    slug: "voxel-renderer",
    owner: "NSkogstad-AUS",
    repo: "cpp-voxel-renderer",
    title: "Voxel Renderer",
    customDescription: "Small OpenGL playground that renders voxel chunks and a simple height-map terrain.",
    fallback: {
      name: "cpp-voxel-renderer",
      fullName: "NSkogstad-AUS/cpp-voxel-renderer",
      stars: 1,
      description: "GPU-accelerated voxel renderer with playful lighting experiments and shader tricks",
      contributors: [],
    },
    tags: ["opengl", "cpp", "graphics", "voxels"],
  },
];

const DEFAULT_GITHUB_USER = "NSkogstad-AUS";
const COMMITS_LIMIT = 4;

function RecentCommitsCard({ username = DEFAULT_GITHUB_USER }: { username?: string }) {
  const [commits, setCommits] = useState<RecentCommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const params = new URLSearchParams({ user: username, limit: `${COMMITS_LIMIT}` });
      try {
        const res = await fetch(`/api/recent-commits?${params.toString()}`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setCommits(Array.isArray(json?.commits) ? json.commits : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("commits fetch failed", err);
          setError("Couldn't load commits right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const segmentsPalette = [
    "#1fb8f3",
    "#3ac7c2",
    "#f07943",
    "#2c8de9",
    "#f1ba3f",
    "#7a6bf2",
    "#45b86f",
    "#e85d7d",
    "#2fa1e0",
    "#d85f36",
    "#22c6c5",
    "#b55ef5",
  ];

  const languagePalette: Record<string, string> = {
    typescript: "#3178c6",
    javascript: "#f1e05a",
    python: "#3572a5",
    go: "#00add8",
    rust: "#dea584",
    java: "#b07219",
    "c++": "#f34b7d",
    c: "#555555",
    "c#": "#178600",
    ruby: "#701516",
    php: "#4f5d95",
    swift: "#f05138",
    kotlin: "#a97bff",
    dart: "#00b4ab",
    shell: "#89e051",
    bash: "#89e051",
    sql: "#e38c00",
    html: "#e34c26",
    css: "#563d7c",
    scss: "#c6538c",
    sass: "#c6538c",
    vue: "#41b883",
    svelte: "#ff3e00",
    scala: "#c22d40",
    elixir: "#6e4a7e",
    erlang: "#b83998",
    clojure: "#5881d8",
    lua: "#000080",
    r: "#198ce7",
    matlab: "#e16737",
    nix: "#5277c3",
  };

  const hashColorIndex = (lang: string) => {
    let hash = 0;
    for (let i = 0; i < lang.length; i += 1) {
      hash = (hash << 5) - hash + lang.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % segmentsPalette.length;
  };

  const getLanguageColor = (lang: string) => {
    const key = lang.toLowerCase();
    return languagePalette[key] ?? segmentsPalette[hashColorIndex(key)];
  };

  const languageWeights = new Map<string, number>();
  commits.forEach((commit) => {
    const langKey = (commit.language || "other").toLowerCase();
    const weight = Math.max(1, (commit.additions ?? 0) + (commit.deletions ?? 0));
    languageWeights.set(langKey, (languageWeights.get(langKey) ?? 0) + weight);
  });

  const totalWeight = Array.from(languageWeights.values()).reduce((acc, val) => acc + val, 0);

  let start = 0;
  const gradientStops: string[] = [];

  const languageEntries = Array.from(languageWeights.entries());
  const defaultShare = languageEntries.length ? 100 / languageEntries.length : 0;
  languageEntries.forEach(([lang, weight]) => {
    const share = totalWeight ? (weight / totalWeight) * 100 : defaultShare;
    const color = getLanguageColor(lang);
    const end = start + share;
    gradientStops.push(`${color} ${start.toFixed(2)}%, ${color} ${end.toFixed(2)}%`);
    start = end;
  });

  const barStyle = {
    backgroundImage:
      gradientStops.length > 0
        ? `linear-gradient(90deg, ${gradientStops.join(", ")})`
        : "linear-gradient(90deg, var(--panel-faint) 0%, var(--surface-accent) 100%)",
  } as CSSProperties;
  const profileUrl = `https://github.com/${username}`;

  return (
    <div className="commits-card">
      <header className="commits-card__head">
        <div className="commits-card__title">
          <span className="commits-card__info-tag" aria-label="Additions vs deletions">
            <i className="bi bi-plus-slash-minus" aria-hidden="true" />
          </span>
          <span>Recent Commits</span>
        </div>
      </header>

      {loading ? (
        <p className="commits-card__status">Loading commits…</p>
      ) : error ? (
        <p className="commits-card__status commits-card__status--error">{error}</p>
      ) : commits.length === 0 ? (
        <p className="commits-card__status">No recent pushes yet.</p>
      ) : (
        <ul className="commit-list">
          {commits.map((commit) => (
            <li className="commit-list__item" key={commit.sha}>
              <div className="commit-list__row">
                <div className="commit-list__text">
                  <span className="commit-list__repo">{commit.repo}</span>
                  <span className="commit-list__divider">:</span>
                  <a
                    className="commit-list__message"
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={commit.message}
                  >
                    {commit.message}
                  </a>
                </div>
                <div className="commit-list__metrics" aria-label="Additions and deletions">
                  <span className="commit-list__add">+{commit.additions}</span>
                  <span className="commit-list__del">-{commit.deletions}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="commits-card__footer">
        <a
          className="commits-card__link"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
        </a>
        <div className="commits-card__bar" style={barStyle} aria-hidden="true" />
      </footer>
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"experience" | "edu">("experience");
  const [collapsed, setCollapsed] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeName>(DEFAULT_THEME);
  const [accentIndex, setAccentIndex] = useState(DEFAULT_ACCENT_INDEX);
  const [bgEffectEnabled, setBgEffectEnabled] = useState(false);
  const [themePrefsLoaded, setThemePrefsLoaded] = useState(false);
  const [melbourneTime, setMelbourneTime] = useState("");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const activeList = tabs.find(t => t.key === activeTab)!.list;
  const showActive = !collapsed;
  const accentStyle = { "--accent": accentSwatches[accentIndex].color } as CSSProperties;
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || MAPTILER_FALLBACK_KEY;

  useEffect(() => {
    const saved = readStoredThemePrefs();

    if (saved.activeTheme && isThemeName(saved.activeTheme)) {
      setActiveTheme(saved.activeTheme);
    }
    if (
      typeof saved.accentIndex === "number" &&
      saved.accentIndex >= 0 &&
      saved.accentIndex < accentSwatches.length
    ) {
      setAccentIndex(saved.accentIndex);
    } else {
      setAccentIndex(DEFAULT_ACCENT_INDEX);
    }
    if (typeof saved.bgEffectEnabled === "boolean") {
      setBgEffectEnabled(saved.bgEffectEnabled);
    }

    setThemePrefsLoaded(true);
  }, []);

  useEffect(() => {
    applyAccent(accentIndex);
  }, [accentIndex]);

  useEffect(() => {
    applyTheme(activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    if (typeof window === "undefined" || !themePrefsLoaded) return;
    const payload = {
      activeTheme,
      accentIndex,
      bgEffectEnabled,
    };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(payload));
  }, [activeTheme, accentIndex, bgEffectEnabled, themePrefsLoaded]);

  const handleTabClick = (key: "experience" | "edu") => {
    setActiveTab(key);
    setCollapsed(false);
  };

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Melbourne",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setMelbourneTime(formatter.format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const loadMap = async () => {
      if (!mapContainerRef.current) return;
      const maplibregl = await import("maplibre-gl");
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets-v4-dark/style.json?key=${maptilerKey}`,
        center: [MAP_LON, MAP_LAT],
        zoom: MAP_ZOOM,
        attributionControl: false,
        cooperativeGestures: true,
      });

      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.doubleClickZoom.disable();
      map.keyboard.disable();

      // minimal attribution in footer; we avoid built-in controls
      cleanup = () => map.remove();
    };
    loadMap();
    return () => {
      if (cleanup) cleanup();
    };
  }, [maptilerKey]);
  
  return (
    <section className="page page--center">
      <div className="hero">
        <div className="card">
          <h1>Hey! I'm Nicolai Skogstad</h1>
          <p>I'm currently studying a Masters of SWE @ <a className="card__link" href="https://www.unimelb.edu.au/" target="_blank" rel="noopener noreferrer">University of Melbourne</a>.
             I've written software that is trusted by {""}
             <a className="card__link" href="https://murmotorsports.eng.unimelb.edu.au/" target="_blank" rel="noopener noreferrer">MUR Motorsports</a>,{" "}
             <a className="card__link" href="https://www.linkedin.com/company/team-emu5/about/" target="_blank" rel="noopener noreferrer">EMU5 Robotics</a>,{" "}
             <a className="card__link" href="https://www.facebook.com/unimelbrover/" target="_blank" rel="noopener noreferrer">Unimelb Rover Team</a>, and the{" "}
             <a className="card__link" href="https://www.melbournespace.com.au/" target="_blank" rel="noopener noreferrer">Melbourne Space Program</a>.{" "}
             Seeing code I wrote actually help people at scale is what keeps me building.
             Currently building <a className="card__link" href="https://noval-tech.netlify.app/" target="_blank" rel="noopener noreferrer">Noval</a>,
            a startup based on making AI easy, reliable, and convenient for local businesses.</p>
        </div>
        <BounceCards
          className="hero__bounce"
          images={bounceImages}
          containerWidth={320}
          containerHeight={260}
          transformStyles={[
            "rotate(-6deg) translate(-30px)",
            "rotate(0deg) translate(0px)",
            "rotate(6deg) translate(30px)",
          ]}
          animationDelay={0.1}
        />
      </div>

      <div className="card2">
        <a className="card2__resumebox card2__item" href="/resume/main.pdf" download target="_blank" rel="noopener noreferrer">
          <i className="bi bi-download" aria-hidden="true"/>
          <span>Resume</span>
        </a>

        <p>|</p>
        
        <a className="card2__item" href="https://www.linkedin.com/in/nicolai-skogstad-8333a221b/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin" aria-hidden="true"/>
          <span>LinkedIn</span>
        </a>

        <p>|</p>
        
        <a className="card2__item" href="https://github.com/NSkogstad-AUS" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github" aria-hidden="true"/>
          <span>GitHub</span>
        </a>

        <p>|</p>

        <a className="card2__learn" href="/pages/about">
          <span>More about me</span>
          <i className="bi bi-arrow-right" aria-hidden="true"/>
        </a>
      </div>

      <div className="card3">
        <div className="card3__header">
          <div className="card3__tabs">
            <button
              className={`card3__tab${showActive && activeTab === "experience" ? " is-active" : ""}`}
              onClick={() => handleTabClick("experience")}
            >
              Experience
            </button>
            <button
              className={`card3__tab${showActive && activeTab === "edu" ? " is-active" : ""}`}
              onClick={() => handleTabClick("edu")}
            >
              Education
            </button>

          <button
            className={`card3__toggle${collapsed ? " is-collapsed" : ""}`}
            onClick={() => setCollapsed(v => !v)}
            aria-expanded={collapsed ? "false" : "true"}
            aria-label={collapsed ? "Expand panel" : "Collapse panel"}
            type="button"
          >
            {collapsed ? "+" : "–"}
          </button>
          </div>
        </div>
      </div>

      <div className={`card3__panel${collapsed ? " is-collapsed" : " is-open"}`} aria-hidden={collapsed}>
        {activeList.map((item) => {
          const key =
            item.kind === "edu"
              ? `${item.kind}-${item.period}-${item.program ?? item.school}`
              : `${item.kind}-${item.period}-${item.company}`;

          const hasAcronym = item.kind === "experience" && item.acronym && item.fullName;
          const displayName =
            item.kind === "experience"
              ? item.acronym ?? item.company
              : item.school;

          return (
            <article className="card3__entry" key={key}>
              
              <div className="card3__timeline">
                <div className="card3__dot">
                  <img src={item.logo ?? "/logos/default.png"} alt="" />
                </div>
              </div>
              <div className="card3__body">
                <div className="card3__period">{item.period}</div>
                <div className="card3__meta">
                  {item.kind === "experience" ? (
                    <>
                      <div className={`card3__name${hasAcronym ? " has-acronym" : ""}`}>
                        <span className="card3__company">{displayName}</span>
                        {hasAcronym && (
                          <>
                            <span aria-hidden className="card3__dots">···</span>
                            <span className="card3__full">{item.fullName}</span>
                          </>
                        )}
                      </div>
                      <div className="card3__role">{item.role}</div>
                    </>
                  ) : (
                    <>
                      <div className="card3__company">{item.school}</div>
                      <div className="card3__role">{item.program}</div>
                    </>
                  )}
                </div>
                <ul className="card3__bullets">
                  {item.bullets
                  .map((b) => b.trim())
                  .filter(Boolean)
                  .map((b, i) => (
                    <li key={`${key}-b-${i}`}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="card4">
        <i className="bi bi-star"/>

        <p>Featured Projects</p>

        <a className="card4__viewall" href="/pages/projects">
          <span>View all</span>
          <i className="bi bi-arrow-right" aria-hidden="true"/>
        </a>
      </div>

      <div className="card4__showcase">
        {featuredProjects.map((project) => (
          <Link
            className={`card4__project card4__project--${project.slug}`}
            key={project.repo}
            href={`/pages/projects#${project.slug}`}
          >
            <div className="card4__project__showcase">
              <ProjectCardShowcase
                owner={project.owner}
                repo={project.repo}
                customDescription={project.customDescription}
                fallback={project.fallback}
                transitionKey={project.slug}
                disableContributorLinks
              />
            </div>
            <div className="card4__project_explain">
              <h1>{project.title}</h1>
              <p>{(findProject(project.slug)?.context ?? project.customDescription) || ""}</p>
              <div className="card4__tags">
                <i className="bi bi-tag" aria-hidden="true" />
                {project.tags.map((tag) => (
                  <span key={`${project.repo}-${tag}`} className="card4__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card5">
        <div className="card5__button1 card5__button--theme">
          <div className="theme-card" style={accentStyle}>
            <div className="theme-card__header">
              <i className="bi bi-brush" aria-hidden="true" />
              <span>Theme</span>
            </div>

            <div className="theme-card__modes" role="group" aria-label="Theme presets">
              {themeOptions.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  className={`theme-card__mode${activeTheme === theme ? " is-active" : ""}`}
                  aria-pressed={activeTheme === theme}
                  onClick={() => setActiveTheme(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>

            <div className="theme-card__swatches" role="group" aria-label="Accent colors">
              {accentSwatches.map((swatch, idx) => (
                <button
                  key={swatch.color}
                  type="button"
                  className={`theme-card__swatch${accentIndex === idx ? " is-selected" : ""}`}
                  aria-pressed={accentIndex === idx}
                  aria-label={`${swatch.label} accent`}
                  style={{ backgroundColor: swatch.color }}
                  onClick={() => setAccentIndex(idx)}
                >
                  {accentIndex === idx ? <span className="theme-card__swatch-ring" /> : null}
                </button>
              ))}
            </div>

          </div>
        </div>

        <div className="card5__button1 card5__button--consultation">
          <div className="book-card__header">
            <i className="bi bi-calendar-event" aria-hidden="true" />
            <p>Connect</p>
          </div>

          <div className="book-card__explanation">
            <p>Always open to interesting projects and conversations.</p>
          </div>
          <a className="book-card__click" href="mailto:nicolai@skogstad.com">
            <div className="book-card__button">
              <p>Let's Chat</p>
            </div>
          </a>
          
        </div>

        <div className="card5__button1">
          <div className="location-card">
            <div className="location-card__header">
              <i className="bi bi-geo-alt" aria-hidden="true" />
              <span>Location</span>
            </div>

            <div className="location-card__map">
              <div
                ref={mapContainerRef}
                className="location-card__map-canvas"
                role="presentation"
                aria-label="Map showing Melbourne"
              />
              <span className="location-card__attribution">© MapTiler © OpenStreetMap</span>
            </div>

            <div className="location-card__footer">
              <span className="location-card__city">Melbourne, VIC</span>
              <span className="location-card__time">
                <i className="bi bi-moon-stars" aria-hidden="true" />
                {melbourneTime || "—:—:—"}
              </span>
            </div>
          </div>
        </div>

        <div className="card5__button1">
          <div className="pin-card">
            <div className="pin-card__header">
              <i className="bi bi-images" aria-hidden="true" />
              <span>Pinterest</span>
            </div>
            <a href="https://pin.it/1F8pSbsu2" rel="noopener" target="_blank">
              <div className="pin-card__grid" aria-label="Pinterest style gallery" >
                {pinImages.map((pin, idx) => (
                  <figure key={`${pin.src}-${idx}`} className="pin-card__item">
                    <img src={pin.src} alt={pin.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
            </a>
          </div>
        </div>

        <div className="card5__button2 card5__button--commits">
          <RecentCommitsCard username={DEFAULT_GITHUB_USER} />
        </div>

        <div className="card5__button2 card5__button--blog">
          <p>Still building!</p>
          <img
            src="/assets/om-snoopy.PNG"
            alt="Snoopy meditating"
            className="card5__snoopy"
          />
        </div>
      </div>

      <StatusBar time={melbourneTime} />
    </section>
  );
}
