"use client"
import "./project.css";
import { Link } from "next-view-transitions";
import { ProjectCardShowcase } from "./ProjectCardShowcase";
import { projects } from "./project-data";
import { StatusBar } from "@/app/components/StatusBar";

export default function ProjectsPage() {
  return (
    <section className="projects-page">
      <div className="card4">
        <i className="bi bi-archive" />
        <p>Projects</p>
      </div>

      <div className="card4__showcase">
        {projects.map((project) => (
          <div
            className={`card4__project card4__project--${project.slug}`}
            key={project.repo}
            id={project.slug}
          >
            <Link className="card4__project__showcase" href={`/pages/projects/${project.slug}`}>
              <ProjectCardShowcase
                owner={project.owner}
                repo={project.repo}
                customDescription={project.customDescription}
                fallback={project.fallback}
                transitionKey={project.slug}
                disableContributorLinks
              />
            </Link>
            <Link className="card4__project_explain" href={`/pages/projects/${project.slug}`}>
              <h1>{project.title}</h1>
              <p>{project.customDescription}</p>
              <div className="card4__tags">
                <i className="bi bi-tag" aria-hidden="true" />
                {project.tags.map((tag) => (
                  <span key={`${project.repo}-${tag}`} className="card4__tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="card4__cta">
                Read the build notes <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </span>
            </Link>
          </div>
        ))}
      </div>

      <StatusBar />
    </section>
  );
}
