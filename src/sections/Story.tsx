import { site, asset } from "../content";
import { pageUrl } from "../content/links";
import { Arrow } from "../components/Arrow";
export function Story() {
  return (
    <section className="story-teaser container section">
      <div className="story-image">
        <img
          src={asset(site.story.image)}
          alt={site.story.imageAlt}
          width="900"
          height="1100"
          loading="lazy"
        />
      </div>
      <div className="story-copy">
        <p className="eyebrow">{site.story.eyebrow}</p>
        <h2>{site.story.title}</h2>
        <p>{site.story.description}</p>
        <a className="text-link" href={pageUrl("story")}>
          {site.story.link}
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
