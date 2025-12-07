"use client";
import "./home.css";
import { useEffect, useState } from "react";
import BounceCards from "@/Imported Components/BounceCards";

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
  "/assets/pf-3.JPG", // consider converting to JPG/PNG for broader browser support
  "/assets/pf-2.JPG",
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

type RepoCardData = {
  name: string;
  fullName: string;
  stars: number;
  description: string | null;
  contributors: string[];
};

function ProjectCardShowcase({
  owner,
  repo,
  fallback,
  customDescription,
}: {
  owner: string;
  repo: string;
  fallback: RepoCardData;
  customDescription?: string;
}) {
  const [data, setData] = useState<RepoCardData>(fallback);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/repo-card?owner=${owner}&repo=${repo}`);
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setData((prev) => ({ ...prev, ...json }));
      } catch (err) {
        console.warn("repo card fetch failed", err);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  const contributors = data.contributors?.length
    ? data.contributors
    : [null, null, null, null];

  return (
    <div className="project-card">
      <div className="project-card__header">
        <div className="project-card__top">
          <div className="project-card__controls">
            <span className="project-card__dot project-card__dot--red" />
            <span className="project-card__dot project-card__dot--yellow" />
            <span className="project-card__dot project-card__dot--green" />
          </div>
          <div className="project-card__stats">
            <span>{data.stars != null ? data.stars.toLocaleString() : "—"}</span>
            <i className="bi bi-star-fill" aria-hidden="true" />
          </div>
        </div>
        <div className="project-card__title">
          <span className="project-card__org">{owner}</span>
          <span className="project-card__slash">/</span>
          <span className="project-card__repo">{data.name ?? repo}</span>
        </div>
      </div>

      <p className="project-card__desc">
        {customDescription ?? data.description ?? "A neat little project fresh out of the oven."}
      </p>

      <div className="project-card__footer">
        <div className="project-card__avatars" aria-hidden="true">
          {contributors.map((avatar, i) => (
            <span
              key={`${avatar ?? "fallback"}-${i}`}
              className={`project-card__avatar project-card__avatar--${((i % 4) + 1) as 1 | 2 | 3 | 4}`}
              style={avatar ? { backgroundImage: `url(${avatar})` } : undefined}
            />
          ))}
        </div>
        <span className="project-card__contributors">
          {data.contributors?.length
            ? `${data.contributors.length} Contributors`
            : "Contributors"}
        </span>
      </div>
    </div>
  );
}


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"experience" | "edu">("experience");
  const [collapsed, setCollapsed] = useState(false);
  const activeList = tabs.find(t => t.key === activeTab)!.list;
  const showActive = !collapsed;

  const handleTabClick = (key: "experience" | "edu") => {
    setActiveTab(key);
    setCollapsed(false);
  };
  
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
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand panel" : "Collapse panel"}
            type="button"
          >
            {collapsed ? "+" : "–"}
          </button>
          </div>
        </div>
      </div>

      {!collapsed && (
        <div className="card3__panel">
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
      )}

      <div className="card4">
        <i className="bi bi-star"/>

        <p>Featured Projects</p>

        <a className="card4__viewall" href="/pages/projects">
          <span>View all</span>
          <i className="bi bi-arrow-right" aria-hidden="true"/>
        </a>
      </div>

      <div className="card4__showcase">
        <div className="card4__project">
          <div className="card4__project__showcase">
            <ProjectCardShowcase
              owner="NSkogstad-AUS"
              repo="Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media"
              customDescription="A machine learning deep-fake tool developed in a team of 5 for a client in the legal industry"
              fallback={{
                name: "Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
                fullName: "NSkogstad-AUS/Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
                stars: 1,
                description: "Weighs the soul of incoming HTTP requests to stop AI crawlers",
                contributors: [],
              }}
            />
          </div>
          <div className="card4__project_explain">
            <h1>Blackline Forensics</h1>
            <p>Hello</p>
            <div className="card4__tags"></div>
          </div>
        </div>

        <div className="card4__project">
          <div className="card4__project__showcase">
            <ProjectCardShowcase
              owner="NSkogstad-AUS"
              repo="cpp-voxel-renderer"
              customDescription="A custom voxel-based engine developed using "
              fallback={{
                name: "cpp-voxel-renderer",
                fullName: "NSkogstad-AUS/cpp-voxel-renderer",
                stars: 1,
                description: "GPU-accelerated voxel renderer with playful lighting experiments and shader tricks",
                contributors: [],
              }}
            />
          </div>
          <div className="card4__project_explain">
            <h1>Voxel Renderer</h1>
            <p>Hello</p>
            <div className="card4__tags"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
