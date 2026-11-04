import { site, asset } from "../content";
import { pageUrl } from "../content/links";
import { Arrow } from "../components/Arrow";
export function GuideTeaser() {
  return (
    <section className="container guide-teaser">
      <img
        src={asset(site.guide.image)}
        alt={site.guide.imageAlt}
        width="1400"
        height="933"
        loading="lazy"
      />
      <div>
        <p className="eyebrow">{site.guide.eyebrow}</p>
        <h2>{site.guide.title}</h2>
        <p>{site.guide.description}</p>
        <a className="button dark" href={pageUrl("guide")}>
          {site.guide.link}
          <Arrow />
        </a>
      </div>
    </section>
  );
}
