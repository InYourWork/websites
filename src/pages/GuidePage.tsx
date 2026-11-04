import { site, asset } from "../content";
import { pageUrl } from "../content/links";
import { Faq } from "../sections/Faq";
import { Arrow } from "../components/Arrow";
export function GuidePage() {
  return (
    <>
      <header className="container page-title">
        <p className="eyebrow">{site.guide.eyebrow}</p>
        <h1>{site.guide.title}</h1>
        <p>{site.guide.description}</p>
      </header>
      <section className="container guide-editorial">
        <img
          src={asset(site.guide.image)}
          alt={site.guide.imageAlt}
          width="1400"
          height="933"
        />
        <div>
          {site.guide.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <a className="text-link" href={pageUrl("products")}>
            {site.ui.allProducts}
            <Arrow />
          </a>
        </div>
      </section>
      <section className="container section guide-steps">
        {site.guide.steps.map((step, index) => (
          <article key={step.title}>
            <span>0{index + 1}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </section>
      <Faq />
    </>
  );
}
