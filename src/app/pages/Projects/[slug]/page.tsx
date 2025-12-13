import "../project.css";
import "./project-detail.css";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { ProjectCardShowcase } from "../ProjectCardShowcase";
import { StickyBackButton } from "../StickyBackButton";
import { findProject } from "../project-data";
import { StatusBar } from "@/app/components/StatusBar";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return notFound();
  }

  const repoUrl = `https://github.com/${project.owner}/${project.repo}`;
  const links = project.links.some((link) => link.href === repoUrl)
    ? project.links
    : [...project.links, { label: "GitHub Repo", href: repoUrl, icon: "github" }];

  return (
    <section className="project-detail project-detail--simple">
      <div className="project-detail__shell">
        <StickyBackButton href="/pages/projects" className="project-detail__actions--top" />

        <div className="project-detail__header-card">
          <ProjectCardShowcase
            owner={project.owner}
            repo={project.repo}
            customDescription={project.customDescription}
            fallback={project.fallback}
            transitionKey={project.slug}
          />
        </div>

        <div className="project-detail__heading-block">
          <div className="project-detail__breadcrumb">~/projects/{project.slug}/</div>
          <h1>{project.title}</h1>
          <div className="project-detail__meta-row">
            <span className="project-detail__meta-item">
              <i className="bi bi-calendar-event" aria-hidden="true" /> {project.timeline}
            </span>
            <span className="project-detail__meta-item">
              <i className="bi bi-person-bounding-box" aria-hidden="true" /> {project.role}
            </span>
            <a
              className="project-detail__meta-item project-detail__meta-link"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github" aria-hidden="true" /> {project.owner}/{project.repo}
            </a>
          </div>
          <div className="project-detail__tags">
            {project.tags.map((tag) => (
              <span key={`${project.slug}-${tag}`} className="project-detail__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr className="project-detail__divider" />

        <article className="project-detail__section">
          <h2>{project.title}</h2>
          <p>{project.context}</p>
          <p>{project.approach}</p>
        </article>

        <article className="project-detail__section">
          <h3>Key Features</h3>
          <ul className="project-detail__list">
            {project.highlights.map((item, idx) => (
              <li key={`${project.slug}-highlight-${idx}`}>
                <strong>{item.split(":")[0]}:</strong>{" "}
                {item.includes(":") ? item.split(":").slice(1).join(":").trim() : ""}
              </li>
            ))}
          </ul>
        </article>

        <article className="project-detail__section">
          <h3>Learnings</h3>
          <ul className="project-detail__list">
            {project.learnings.map((item, idx) => (
              <li key={`${project.slug}-learning-${idx}`}>{item}</li>
            ))}
          </ul>
        </article>

        <StatusBar />
      </div>
    </section>
  );
}
