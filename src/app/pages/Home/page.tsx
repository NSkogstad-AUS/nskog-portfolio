"use client";
import "./home.css";
import { useState } from "react";

type ExpEntry = {
  kind: "experience";
  company: string;
  role: string;
  period: string;
  bullets: string[];
  logo?: string;
  tag?: string;
};

type EduEntry = {
  kind: "edu";
  school: string;
  program: string;
  period: string;
  bullets: string[];
  logo?: string;
  tag?: string;
};

const expEntries: ExpEntry[] = [
  {
    kind: "experience",
    company: "DBS Bank",
    role: "Graduate Associate (SEED Programme)",
    period: "Jul 2023 – Present",
    bullets: [
      "Developed the Java backend for a bank account servicing process with multi-channel integrations using Activiti workflow",
      "Built a custom database migration tool using Python and MariaDB to migrate 1000+ processes from a vendor platform",
    ],
    logo: "/logos/dbs.png",
  },
  {
    kind: "experience",
    company: "Singapore Institute of Technology",
    role: "Software Developer (Contract)",
    period: "Apr 2023 – Jun 2023",
    bullets: [
      "Built NFTVue, an NFT gallery for students to verify school-issued NFTs",
      "Delivered DemoConstruct (React + Python) using Meshroom to reconstruct 3D models from captured images",
    ],
    logo: "/logos/sit.png",
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


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"experience" | "edu">("experience");
const activeList = tabs.find(t => t.key === activeTab)!.list;
  
  return (
    <section className="page page--center">
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
        <div className="card3__tabs">
          <button
            className={`card3__tab${activeTab === "experience" ? " is-active" : ""}`}
            onClick={() => setActiveTab("experience")}
          >
            Experience
          </button>
          <button
            className={`card3__tab${activeTab === "edu" ? " is-active" : ""}`}
            onClick={() => setActiveTab("edu")}
          >
            Education
          </button>
        </div>
      </div>

      <div className="card3__panel">
          {activeList.map((item) => {
            const key =
              item.kind === "edu"
                ? `${item.kind}-${item.period}-${item.program ?? item.school}`
                : `${item.kind}-${item.period}-${item.company}`;

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
                        <div className="card3__company">{item.company}</div>
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
                    {item.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}
