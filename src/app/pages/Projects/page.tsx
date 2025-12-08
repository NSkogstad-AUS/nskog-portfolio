"use client"
import "./project.css";
import { useEffect, useState } from "react";

type RepoCardContributor = {
  login: string;
  avatar: string;
  profileUrl: string;
};

type RepoCardData = {
  name: string;
  fullName: string;
  stars: number;
  description: string | null;
  contributors: RepoCardContributor[];
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

  const contributors: RepoCardContributor[] = data.contributors?.length
    ? data.contributors
    : [
        {
          login: owner,
          avatar: `https://github.com/${owner}.png?size=96`,
          profileUrl: `https://github.com/${owner}`,
        },
      ];

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
        <div className="project-card__avatars">
          {contributors.map((contributor, i) => (
            <a
              key={`${contributor.login}-${i}`}
              className={`project-card__avatar project-card__avatar--${((i % 4) + 1) as 1 | 2 | 3 | 4}`}
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@${contributor.login}`}
              title={`@${contributor.login}`}
            >
              {contributor.avatar ? (
                <img src={contributor.avatar} alt={`@${contributor.login} avatar`} />
              ) : null}
            </a>
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

export default function ProjectsPage() {
  return (
    <section className="projects-page">
      <div className="card4">
        <i className="bi bi-archive" />
        <p>Projects</p>
      </div>

      <div className="card4__showcase">
        <div className="card4__project">
          <div className="card4__project__showcase">
            <ProjectCardShowcase
              owner="NSkogstad-AUS"
              repo="Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media"
              customDescription="A machine learning deep-fake website developed in a team of 5 for a client"
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
            <h1>Deepfake Detector</h1>
            <p>Hello</p>
            <div className="card4__tags"></div>
          </div>
        </div>

        <div className="card4__project">
          <div className="card4__project__showcase">
            <ProjectCardShowcase
              owner="NSkogstad-AUS"
              repo="cpp-voxel-renderer"
              customDescription="Small OpenGL playground that renders voxel chunks and a simple height-map terrain"
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

        <div className="card4__project">
          <div className="card4__project__showcase">
            <ProjectCardShowcase
              owner="NSkogstad-AUS"
              repo="nskog-portfolio"
              customDescription="A personal portfolio for personal/professional purposes, outlining experience, education, and a personal blog"
              fallback={{
                name: "nskog-portfolio",
                fullName: "NSkogstad-AUS/nskog-portfolio",
                stars: 1,
                description: "A personal portfolio for personal/professional purposes, outlining experience, education, and a personal blog",
                contributors: [],
              }}
            />
          </div>
          <div className="card4__project_explain">
            <h1>Personal Portfolio</h1>
            <p>Hello</p>
            <div className="card4__tags"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
