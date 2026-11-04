import { site } from "../content";
import { SectionHeading } from "../components/SectionHeading";
import { Arrow } from "../components/Arrow";

export function Services() {
  return (
    <section id="services" className="section container">
      <SectionHeading {...site.services} />
      <div className="service-grid">
        {site.services.items.map((item, index) => (
          <article className="service" key={item.id}>
            <span className="service-number">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <a
              href="#contact"
              className="service-link"
              aria-label={`${site.hero.primary}：${item.title}`}
            >
              <Arrow diagonal />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
