import { useState } from "react";
import { site, asset } from "../content";
import { SectionHeading } from "../components/SectionHeading";
import { pageUrl } from "../content/links";
import { Arrow } from "../components/Arrow";

export function Projects({ collection = false }: { collection?: boolean }) {
  const [filter, setFilter] = useState(site.work.allLabel);
  const filters = [
    site.work.allLabel,
    ...new Set(site.work.items.map((item) => item.category)),
  ];
  return (
    <section id="work" className="work-section section">
      <div className="container">
        <SectionHeading {...site.work} />
        {collection && (
          <div className="filters" role="group" aria-label={site.ui.categories}>
            {filters.map((value) => (
              <button
                type="button"
                aria-pressed={filter === value}
                key={value}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
        )}
        <div className="project-grid">
          {site.work.items
            .filter(
              (item) =>
                filter === site.work.allLabel || item.category === filter,
            )
            .map((item) => (
              <article className="project" key={item.id}>
                <a
                  className="project-open"
                  href={pageUrl("project", { id: item.id })}
                  aria-label={`${site.ui.viewProject}：${item.name}`}
                >
                  <div className="project-image">
                    <img
                      src={asset(item.image)}
                      alt={item.imageAlt}
                      width="720"
                      height="540"
                      loading="lazy"
                    />
                    <span className="project-label">
                      {site.ui.projectLabel}
                    </span>
                    <span className="project-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="project-heading">
                    <h3>{item.name}</h3>
                    <span>{item.category}</span>
                  </div>
                  <p>{item.summary}</p>
                </a>
              </article>
            ))}
        </div>
        {!collection && (
          <a className="text-link collection-link" href={pageUrl("projects")}>
            {site.ui.allProjects}
            <Arrow />
          </a>
        )}
      </div>
    </section>
  );
}
