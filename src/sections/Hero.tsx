import { site, asset } from "../content";
import { pageUrl } from "../content/links";
import { Arrow } from "../components/Arrow";
export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <h1>
          {site.hero.title[0]}
          <br />
          <span>{site.hero.title[1]}</span>
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <a className="button primary" href={pageUrl("products")}>
            {site.hero.primary}
            <Arrow />
          </a>
          <a className="text-link" href={pageUrl("guide")}>
            {site.hero.secondary}
          </a>
        </div>
      </div>
      <figure className="hero-visual">
        <img
          src={asset(site.hero.image)}
          alt={site.hero.imageAlt}
          width="1600"
          height="1067"
          fetchPriority="high"
        />
        <figcaption>
          {site.hero.caption}
          <Arrow diagonal />
        </figcaption>
        <span className="hero-spark" aria-hidden="true">
          ✳
        </span>
      </figure>
    </section>
  );
}
