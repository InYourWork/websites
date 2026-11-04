import { useEffect, useState } from "react";
import { site } from "../content";
import { LanguageMenu } from "./LanguageMenu";
import { pageUrl, homeLink } from "../content/links";
import { Arrow } from "./Arrow";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("nav-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <a
          href={pageUrl()}
          className="brand"
          aria-label={`${site.brand.name} · ${site.ui.backTop}`}
        >
          <span className="brand-mark" aria-hidden="true">
            川
          </span>
          <span>
            {site.brand.name}
            <small>{site.brand.english}</small>
          </span>
        </a>
        <LanguageMenu />
        <button
          id="nav-toggle"
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? site.ui.closeMenu : site.ui.menu}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="main-nav"
          className={open ? "navigation is-open" : "navigation"}
          aria-label={site.ui.navigation}
        >
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={
                link.href === "#work"
                  ? pageUrl("projects")
                  : homeLink(link.href)
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            {site.hero.primary}
            <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}
