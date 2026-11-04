import { site, business } from "../content";
import { enquiryHref } from "../content/catalog.js";
import { Arrow } from "../components/Arrow";
export function Contact() {
  const email: string | null = business.email;
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="container contact-inner">
          <div>
            <p className="eyebrow">{site.contact.eyebrow}</p>
            <h2>{site.contact.title}</h2>
            <p>{site.contact.description}</p>
          </div>
          <div className="contact-action">
            {email ? (
              <a className="button primary" href={enquiryHref(email)}>
                {site.contact.emailLabel}
                <Arrow diagonal />
              </a>
            ) : (
              <span className="contact-placeholder">
                {site.contact.placeholder}
                <Arrow diagonal />
              </span>
            )}
            <p>{email ?? site.brand.descriptor}</p>
          </div>
        </div>
      </section>
      <footer className="container footer">
        <div className="footer-top">
          <span className="footer-brand">
            {site.brand.name}
            <small>{site.brand.english}</small>
          </span>
          <a href="#top">
            {site.ui.backTop}
            <Arrow diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.brand.copyright}
          </span>
          <p>{site.contact.note}</p>
        </div>
      </footer>
    </>
  );
}
