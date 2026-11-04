import { site, asset, projectId } from "../content";
import { pageUrl } from "../content/links";
export function ProjectPage() {
  const project = site.work.items.find((item) => item.id === projectId);
  if (!project)
    return (
      <section className="container section">
        <h1>{site.ui.notFound}</h1>
        <a className="text-link" href={pageUrl("projects")}>
          {site.ui.backProjects}
        </a>
      </section>
    );
  return (
    <article className="container project-detail">
      <nav className="breadcrumbs" aria-label={site.ui.navigation}>
        <a href={pageUrl()}>{site.ui.home}</a>
        <span>/</span>
        <a href={pageUrl("projects")}>{site.work.pageTitle}</a>
        <span>/</span>
        <span>{project.name}</span>
      </nav>
      <header className="detail-heading">
        <p className="eyebrow">
          {site.ui.projectLabel} / {project.category}
        </p>
        <h1>{project.name}</h1>
        <p>{project.summary}</p>
      </header>
      <img
        className="detail-cover"
        src={asset(project.image)}
        alt={project.imageAlt}
      />
      <div className="detail-body">
        <div>
          <h2>{site.ui.projectIntro}</h2>
          <p>{project.detail}</p>
        </div>
        <aside>
          <h2>{site.ui.deliverables}</h2>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
      <a className="text-link" href={pageUrl("projects")}>
        ← {site.ui.backProjects}
      </a>
    </article>
  );
}
