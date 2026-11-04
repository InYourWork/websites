import { site, asset } from "../content";
import { Arrow } from "../components/Arrow";

export function Hero() {
  return (
    <section className="container hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          {site.hero.eyebrow}
        </p>
        <h1 id="hero-title">
          {site.hero.title[0]}
          <br />
          <span>{site.hero.title[1]}</span>
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <a className="button primary" href="#contact">
            {site.hero.primary}
            <Arrow diagonal />
          </a>
          <a className="text-link" href="#services">
            {site.hero.secondary}
            <Arrow />
          </a>
        </div>
        <p className="hero-signature">{site.brand.descriptor}</p>
      </div>
      <figure className="hero-visual">
        <img
          src={asset(site.hero.image)}
          alt={site.hero.imageAlt}
          width="750"
          height="900"
          fetchPriority="high"
        />
        <span className="image-index" aria-hidden="true">
          F / F — 01
        </span>
        <figcaption>
          <span>{site.hero.note}</span>
          <strong>{site.hero.caption}</strong>
        </figcaption>
      </figure>
    </section>
  );
}
