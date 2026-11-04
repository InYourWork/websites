import { useState } from "react";
import { site, asset } from "../content";
import { SectionHeading } from "../components/SectionHeading";
import { pageUrl } from "../content/links";
import { Arrow } from "../components/Arrow";

export function Collections({ collection = false }: { collection?: boolean }) {
  const [filter, setFilter] = useState(site.collections.allLabel);
  const filters = [
    site.collections.allLabel,
    ...new Set(site.collections.items.map((item) => item.category)),
  ];
  return (
    <section id="collections" className="collections-section section">
      <div className="container">
        <SectionHeading {...site.collections} />
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
        <div className="collection-grid">
          {site.collections.items
            .filter(
              (item) =>
                filter === site.collections.allLabel ||
                item.category === filter,
            )
            .map((item) => (
              <article className="collection" key={item.id}>
                <a
                  className="collection-open"
                  href={pageUrl("collection", { id: item.id })}
                  aria-label={`${site.ui.viewCollection}：${item.name}`}
                >
                  <div className="collection-image">
                    <img
                      src={asset(item.image)}
                      alt={item.imageAlt}
                      width="720"
                      height="540"
                      loading="lazy"
                    />
                    <span className="collection-label">
                      {site.ui.collectionLabel}
                    </span>
                    <span className="collection-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="collection-heading">
                    <h3>{item.name}</h3>
                    <span>{item.category}</span>
                  </div>
                  <p>{item.summary}</p>
                </a>
              </article>
            ))}
        </div>
        {!collection && (
          <a
            className="text-link collection-link"
            href={pageUrl("collections")}
          >
            {site.ui.allCollections}
            <Arrow />
          </a>
        )}
      </div>
    </section>
  );
}
