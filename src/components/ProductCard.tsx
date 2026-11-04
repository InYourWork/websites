import { asset, site, type Product } from "../content";
import { pageUrl } from "../content/links";
import { Arrow } from "./Arrow";
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <a
        href={pageUrl("product", { id: product.id })}
        aria-label={`${site.ui.viewProduct}: ${product.name}`}
      >
        <div className="product-image">
          <img
            src={asset(product.image)}
            alt={product.imageAlt}
            width="720"
            height="720"
            loading="lazy"
          />
          <span className="product-arrow">
            <Arrow diagonal />
          </span>
        </div>
        <p className="product-category">
          {
            site.products.categories.find(
              (category) => category.id === product.category,
            )?.label
          }
        </p>
        <h3>{product.name}</h3>
        <p className="product-summary">{product.summary}</p>
      </a>
    </article>
  );
}
