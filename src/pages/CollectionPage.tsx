import { site, asset, contentId } from "../content";
import { pageUrl } from "../content/links";
export function CollectionPage() {
  const collection = site.collections.items.find(
    (item) => item.id === contentId,
  );
  if (!collection)
    return (
      <section className="container section">
        <h1>{site.ui.notFound}</h1>
        <a className="text-link" href={pageUrl("collections")}>
          {site.ui.backCollections}
        </a>
      </section>
    );
  return (
    <article className="container collection-detail">
      <nav className="breadcrumbs" aria-label={site.ui.navigation}>
        <a href={pageUrl()}>{site.ui.home}</a>
        <span>/</span>
        <a href={pageUrl("collections")}>{site.collections.pageTitle}</a>
        <span>/</span>
        <span>{collection.name}</span>
      </nav>
      <header className="detail-heading">
        <p className="eyebrow">
          {site.ui.collectionLabel} / {collection.category}
        </p>
        <h1>{collection.name}</h1>
        <p>{collection.summary}</p>
      </header>
      <img
        className="detail-cover"
        src={asset(collection.image)}
        alt={collection.imageAlt}
      />
      <div className="detail-body">
        <div>
          <h2>{site.ui.collectionIntro}</h2>
          <p>{collection.detail}</p>
        </div>
        <aside>
          <h2>{site.ui.highlights}</h2>
          <ul>
            {collection.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
      <a className="text-link" href={pageUrl("collections")}>
        ← {site.ui.backCollections}
      </a>
    </article>
  );
}
