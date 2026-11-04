import { site, asset, contentId, business } from "../content";
import { pageUrl } from "../content/links";
import { enquiryHref } from "../content/catalog.js";
import { ProductCard } from "../components/ProductCard";
import { Arrow } from "../components/Arrow";
export function ProductPage() {
  const product = site.products.items.find((item) => item.id === contentId);
  if (!product) throw new Error(`Unknown product: ${contentId}`);
  const enquiry = enquiryHref(business.email, product.name);
  const category = site.products.categories.find(
    (item) => item.id === product.category,
  );
  return (
    <article className="container product-detail">
      <nav className="breadcrumbs" aria-label={site.ui.navigation}>
        <a href={pageUrl()}>{site.ui.home}</a>
        <span>/</span>
        <a href={pageUrl("products")}>{site.ui.backProducts}</a>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-overview">
        <figure className="detail-visual">
          <img
            src={asset(product.image)}
            alt={product.imageAlt}
            width="1000"
            height="1000"
          />
          <figcaption>{site.ui.photoNote}</figcaption>
        </figure>
        <div className="product-copy">
          <p className="eyebrow">{category?.label}</p>
          <h1>{product.name}</h1>
          <p className="detail-summary">{product.summary}</p>
          <p>{product.detail}</p>
          <ul className="highlights">
            {product.highlights.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <div className="enquiry-action">
            <a className="button primary" href={enquiry}>
              {site.ui.enquire}
              <Arrow diagonal />
            </a>
          </div>
          <a className="text-link" href={pageUrl("guide")}>
            {site.guide.link}
            <Arrow />
          </a>
        </div>
      </div>
      <section className="related section">
        <header className="section-heading">
          <h2>{site.ui.related}</h2>
          <a className="text-link" href={pageUrl("products")}>
            {site.ui.allProducts}
            <Arrow />
          </a>
        </header>
        <div className="product-grid">
          {site.products.items
            .filter((item) => item.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </article>
  );
}
