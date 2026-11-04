import { site } from "../content";
import { SectionHeading } from "../components/SectionHeading";
export function Process() {
  return (
    <section id="process" className="section container">
      <SectionHeading {...site.process} />
      <ol className="process-grid">
        {site.process.items.map((item, index) => (
          <li key={item.title}>
            <span>0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
