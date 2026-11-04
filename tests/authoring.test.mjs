import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import config from "../src/content/config.json" with { type: "json" };
import registry from "../src/pages/registry.json" with { type: "json" };
import { validateConfig, routePath } from "../src/content/routes.js";
import { expandPages } from "../src/pages/definitions.js";
import { outputFile, renderHtml } from "../scripts/html.mjs";
const content = JSON.parse(
  await readFile(
    new URL(
      `../src/content/locales/${config.defaultLocale}.json`,
      import.meta.url,
    ),
    "utf8",
  ),
);

test("metadata preserves replacement tokens and escapes HTML", () => {
  const text = 'Plans $& $` $\' $$ <offer> "quoted"';
  const html = renderHtml(
    '<html><title></title><meta name="description" content="" /><div id="root"></div>',
    {
      locale: "en-US",
      page: "home",
      id: "",
      title: text,
      description: text,
      root: "./",
      html: "<h1>Safe</h1>",
    },
  );
  assert.ok(
    html.includes("Plans $&amp; $` $' $$ &lt;offer&gt; &quot;quoted&quot;"),
  );
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.ok(html.includes("<h1>Safe</h1>"));
});
test("invalid language config and unsafe output paths fail before writes", () => {
  for (const prefix of [
    "",
    "..",
    "../escape",
    "/absolute",
    "a/b",
    "a%2fb",
    "a\\b",
  ]) {
    assert.throws(() =>
      validateConfig({
        ...config,
        locales: [{ code: config.defaultLocale, prefix }],
      }),
    );
  }
  assert.throws(() => validateConfig({ ...config, defaultLocale: "missing" }));
  assert.throws(() =>
    validateConfig({
      ...config,
      locales: [config.locales[0], config.locales[0]],
    }),
  );
  for (const path of [
    "../escape/",
    "/absolute/",
    "a/../../escape/",
    "a\\b/",
    "a%2fb/",
  ])
    assert.throws(() => outputFile("/tmp/site-output", path));
  assert.ok(
    outputFile("/tmp/site-output", "collections/example/").endsWith(
      "/site-output/collections/example/index.html",
    ),
  );
});
test("single language, collection additions and new pages derive from configuration", () => {
  const single = {
    defaultLocale: config.defaultLocale,
    locales: config.locales.filter(
      (item) => item.code === config.defaultLocale,
    ),
  };
  validateConfig(single);
  assert.equal(routePath(single, single.defaultLocale), "");
  const modified = structuredClone(content);
  modified.collections.items.push({
    ...modified.collections.items[0],
    id: "new-collection",
    name: "New collection",
  });
  modified.nav.reverse();
  const definitions = [
    ...registry,
    {
      id: "about",
      path: "about/",
      component: "AboutPage",
      title: "story.title",
    },
  ];
  const pages = expandPages(modified, definitions);
  assert.ok(pages.some((page) => page.id === "new-collection"));
  assert.ok(pages.some((page) => page.page === "about"));
  assert.equal(
    pages.find((page) => page.page === "collections").title,
    `${content.collections.pageTitle} | ${content.meta.title}`,
  );
  assert.equal(
    routePath(single, single.defaultLocale, "about", "", definitions),
    "about/",
  );
});
