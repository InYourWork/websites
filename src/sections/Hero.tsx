import { site, asset } from "../content";
import { pageUrl } from "../content/links";
import { Arrow } from "../components/Arrow";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-heading">
        <div>
          <p className="eyebrow">{site.hero.eyebrow}</p>
          <h1 id="hero-title">
            {site.hero.title[0]}
            <br />
            <em>{site.hero.title[1]}</em>
          </h1>
        </div>
        <div className="hero-description">
          <p>{site.hero.description}</p>
          <a className="text-link" href={pageUrl("collections")}>
            {site.hero.primary}
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <figure className="hero-visual">
        <img
          src={asset(site.hero.image)}
          alt={site.hero.imageAlt}
          width="1800"
          height="1100"
          fetchPriority="high"
        />
        <figcaption>
          <span>{site.hero.note}</span>
          <span>{site.hero.caption}</span>
        </figcaption>
      </figure>
    </section>
  );
}
