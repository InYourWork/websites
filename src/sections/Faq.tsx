import { site } from "../content";
export function Faq() {
  return (
    <section
      className="section container faq-section"
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title">{site.faq.title}</h2>
      <div>
        {site.faq.items.map((item) => (
          <details name="faq" key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
