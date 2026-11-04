import { useState } from "react";
import { site } from "../content";
import { filterProducts } from "../content/catalog.js";
import { pageUrl } from "../content/links";
import { ProductCard } from "../components/ProductCard";
import { Arrow } from "../components/Arrow";
export function Products({ catalog = false }: { catalog?: boolean }) {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const items = filterProducts(site.products.items, category, query);
  return (
    <section className="container section products-section" id="products">
      {!catalog && (
        <header className="section-heading">
          <div>
            <p className="eyebrow">{site.products.eyebrow}</p>
            <h2>{site.products.title}</h2>
          </div>
          <a className="text-link" href={pageUrl("products")}>
            {site.ui.allProducts}
            <Arrow />
          </a>
        </header>
      )}
      {catalog && (
        <>
          <div className="catalog-tools">
            <div
              className="filters"
              role="group"
              aria-label={site.ui.categories}
            >
              {[
                { id: "", label: site.products.allLabel },
                ...site.products.categories,
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="search-field">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
              <span className="sr-only">{site.ui.search}</span>
              <input
                type="search"
                name="product-search"
                value={query}
                placeholder={site.ui.searchPlaceholder}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <p className="result-count" role="status">
            {items.length}{" "}
            {items.length === 1 ? site.ui.resultOne : site.ui.results}
          </p>
        </>
      )}
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {!items.length && (
        <div className="empty-state">
          <p>{site.ui.empty}</p>
          <button
            type="button"
            className="button primary"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
          >
            {site.ui.reset}
          </button>
        </div>
      )}
    </section>
  );
}
