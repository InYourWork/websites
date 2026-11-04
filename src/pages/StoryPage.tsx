import { site, asset } from "../content";
import { Faq } from "../sections/Faq";
export function StoryPage() {
  return (
    <>
      <header className="container story-heading">
        <p className="eyebrow">{site.story.eyebrow}</p>
        <h1>{site.story.title}</h1>
        <p>{site.story.description}</p>
      </header>
      <div className="container story-editorial">
        <img
          src={asset(site.story.image)}
          alt={site.story.imageAlt}
          width="900"
          height="1100"
        />
        <div>
          {site.story.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
      <section className="container section values-grid" id="approach">
        {site.story.values.map((value, index) => (
          <article key={value.title}>
            <span className="eyebrow">0{index + 1}</span>
            <h2>{value.title}</h2>
            <p>{value.description}</p>
          </article>
        ))}
      </section>
      <Faq />
    </>
  );
}
