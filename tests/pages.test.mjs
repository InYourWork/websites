import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import registry from "../src/pages/registry.json" with { type: "json" };
import { expandPages } from "../src/pages/definitions.js";
import { routePath } from "../src/content/routes.js";
const config = JSON.parse(
  await readFile(
    new URL("../src/content/config.json", import.meta.url),
    "utf8",
  ),
);

const root = resolve("dist");
async function collect(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, item.name);
    if (item.isDirectory()) files.push(...(await collect(path)));
    else if (item.name.endsWith(".html")) files.push(path);
  }
  return files;
}
const pages = new Map();
for (const path of await collect(root)) {
  const html = await readFile(path, "utf8");
  pages.set(path, {
    html,
    ids: [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  });
}

test("all static pages have complete sections, valid links and matching anchor targets", async () => {
  assert.ok(pages.size > 0);
  for (const [path, { html, ids }] of pages) {
    const name = relative(root, path);
    assert.equal(new Set(ids).size, ids.length, `Duplicate id: ${name}`);
    assert.equal(
      [...html.matchAll(/<h1\b/g)].length,
      1,
      `Expected one page heading: ${name}`,
    );
    for (const match of html.matchAll(
      /<(?:a|img|script|link)\b[^>]*\b(?:href|src)="([^"]+)"/g,
    )) {
      const href = match[1].replaceAll("&amp;", "&");
      const url = new URL(href, pathToFileURL(path));
      if (url.protocol !== "file:") continue;
      let target = fileURLToPath(url);
      assert.ok(
        target === root || target.startsWith(root + "/"),
        `${name}: escapes site root: ${href}`,
      );
      const info = await stat(target).catch(() => null);
      assert.ok(info, `${name}: missing target: ${href}`);
      if (info.isDirectory()) target = resolve(target, "index.html");
      if (url.hash)
        assert.ok(
          pages
            .get(target)
            ?.ids.includes(decodeURIComponent(url.hash.slice(1))),
          `${name}: missing anchor: ${href}`,
        );
      if (target.endsWith(".html"))
        assert.ok(pages.has(target), `${name}: missing page: ${href}`);
    }
  }
});

const readContents = new Map(
  await Promise.all(
    config.locales.map(async (entry) => [
      entry.code,
      await readFile(
        new URL(`../src/content/locales/${entry.code}.json`, import.meta.url),
        "utf8",
      ),
    ]),
  ),
);

test("configured language variants have matching pages and anchor targets", () => {
  const keys = new Set();
  for (const [path, { html, ids }] of pages) {
    const kind = html.match(/data-page="([^"]+)"/)?.[1];
    const project = html.match(/data-project="([^"]*)"/)?.[1] ?? "";
    const language = html.match(/<html[^>]*lang="([^"]+)"/)?.[1];
    assert.ok(config.locales.some((entry) => entry.code === language));
    assert.ok(kind);
    assert.equal(
      path,
      resolve(root, routePath(config, language, kind, project), "index.html"),
    );
    const key = `${kind}:${project}`;
    keys.add(key);
    for (const entry of config.locales) {
      const counterpart = resolve(
        root,
        routePath(config, entry.code, kind, project),
        "index.html",
      );
      assert.deepEqual(pages.get(counterpart)?.ids, ids, counterpart);
    }
  }
  for (const entry of config.locales) {
    assert.ok(
      pages.has(resolve(root, routePath(config, entry.code), "index.html")),
    );
    const content = JSON.parse(readContents.get(entry.code));
    for (const route of expandPages(content, registry))
      assert.ok(keys.has(`${route.page}:${route.id}`), route.page);
  }
});
