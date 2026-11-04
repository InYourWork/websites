import { site } from "../content";
export function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">{site.about.eyebrow}</p>
          <h2>{site.about.title}</h2>
        </div>
        <div>
          <p className="about-description">{site.about.description}</p>
          <ul>
            {site.about.principles.map((value, i) => (
              <li key={value}>
                <span>0{i + 1}</span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
