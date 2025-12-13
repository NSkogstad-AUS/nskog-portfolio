"use client";

import { useEffect, useRef, useState } from "react";
import type { RepoCardContributor, RepoCardData } from "./project-data";

type ProjectCardShowcaseProps = {
  owner: string;
  repo: string;
  fallback: RepoCardData;
  customDescription?: string;
  transitionKey?: string;
  alwaysTransitionName?: boolean;
};

export function ProjectCardShowcase({
  owner,
  repo,
  fallback,
  customDescription,
  alwaysTransitionName = false,
  transitionKey,
}: ProjectCardShowcaseProps) {
  const [data, setData] = useState<RepoCardData>(fallback);
  const cardRef = useRef<HTMLDivElement | null>(null);

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

  const viewTransitionName = "project-card";
  const shouldApply = alwaysTransitionName || Boolean(transitionKey);

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
    <div
      ref={cardRef}
      className="project-card"
      style={shouldApply ? { viewTransitionName } : undefined}
      onPointerDown={() => {
        if (cardRef.current && shouldApply) {
          cardRef.current.style.viewTransitionName = viewTransitionName;
        }
      }}
    >
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
