import { Projects } from "../sections/Projects";
import { site } from "../content";
export function ProjectsPage() {
  return (
    <>
      <div className="container page-title">
        <p className="eyebrow">{site.brand.name}</p>
        <h1>{site.work.pageTitle}</h1>
      </div>
      <Projects collection />
    </>
  );
}
