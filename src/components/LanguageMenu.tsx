import { useEffect, useRef, useState } from "react";
import { locale, locales, site, localizedPath } from "../content";

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      className="language-menu"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="language-trigger"
        aria-label={site.ui.language}
        aria-expanded={open}
        aria-controls="language-options"
        onClick={() => setOpen(!open)}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
        {locales.find((item) => item.code === locale)?.label}
        <span className="language-chevron" aria-hidden="true">
          ⌄
        </span>
      </button>
      {open && (
        <ul
          id="language-options"
          className="language-options"
          aria-label={site.ui.language}
        >
          {locales.map((item) => {
            return (
              <li key={item.code}>
                <a
                  href={localizedPath(item.code)}
                  onClick={(event) => {
                    const hash = window.location.hash;
                    if (hash && document.getElementById(hash.slice(1)))
                      event.currentTarget.hash = hash;
                  }}
                  lang={item.code}
                  hrefLang={item.code}
                  aria-current={locale === item.code ? "true" : undefined}
                >
                  {item.label}
                  <span aria-hidden="true">
                    {locale === item.code ? "✓" : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
