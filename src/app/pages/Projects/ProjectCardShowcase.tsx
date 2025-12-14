"use client";

import { useEffect, useState } from "react";
import type { RepoCardContributor, RepoCardData } from "./project-data";

type ProjectCardShowcaseProps = {
  owner: string;
  repo: string;
  fallback: RepoCardData;
  customDescription?: string;
  transitionKey?: string;
  alwaysTransitionName?: boolean;
  disableContributorLinks?: boolean;
};

export function ProjectCardShowcase({
  owner,
  repo,
  fallback,
  customDescription,
  alwaysTransitionName = false,
  transitionKey,
  disableContributorLinks = false,
}: ProjectCardShowcaseProps) {
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

  const shouldApply = alwaysTransitionName || Boolean(transitionKey);
  const transitionModifier = transitionKey ?? "default";
  const cardClassName = `project-card${
    shouldApply ? ` project-card--transition-${transitionModifier}` : ""
  }`;

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
    <div className={cardClassName}>
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
            disableContributorLinks ? (
              <span
                key={`${contributor.login}-${i}`}
                className={`project-card__avatar project-card__avatar--${((i % 4) + 1) as 1 | 2 | 3 | 4}`}
                aria-label={`@${contributor.login}`}
                title={`@${contributor.login}`}
              >
                {contributor.avatar ? (
                  <img src={contributor.avatar} alt={`@${contributor.login} avatar`} />
                ) : null}
              </span>
            ) : (
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
            )
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
