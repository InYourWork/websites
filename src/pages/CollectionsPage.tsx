import { Collections } from "../sections/Collections";
import { site } from "../content";
export function CollectionsPage() {
  return (
    <>
      <div className="container page-title">
        <p className="eyebrow">{site.brand.name}</p>
        <h1>{site.collections.pageTitle}</h1>
      </div>
      <Collections collection />
    </>
  );
}
