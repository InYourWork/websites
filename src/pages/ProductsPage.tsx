import { Products } from "../sections/Products";
import { site } from "../content";
export function ProductsPage() {
  return (
    <>
      <header className="container page-title">
        <p className="eyebrow">{site.products.eyebrow}</p>
        <h1>{site.products.pageTitle}</h1>
        <p>{site.products.intro}</p>
      </header>
      <Products catalog />
    </>
  );
}
