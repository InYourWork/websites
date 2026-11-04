import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve, relative } from "node:path";
const root = new URL("../", import.meta.url);
const config = JSON.parse(
  await readFile(new URL("src/content/config.json", root), "utf8"),
);
const contents = await Promise.all(
  config.locales.map(async ({ code }) =>
    JSON.parse(
      await readFile(new URL(`src/content/locales/${code}.json`, root), "utf8"),
    ),
  ),
);
const manifest = JSON.parse(
  await readFile(new URL("template.json", root), "utf8"),
);

test("all referenced photographs exist locally and have provenance", async () => {
  const credits = JSON.parse(
    await readFile(new URL("ASSET-CREDITS.json", root), "utf8"),
  );
  for (const content of contents)
    for (const item of [
      content.hero,
      content.story,
      ...content.collections.items,
    ]) {
      assert.ok(item.imageAlt?.trim());
      const base = resolve(new URL("public/", root).pathname);
      const file = resolve(base, item.image);
      assert.ok(!relative(base, file).startsWith(".."));
      await access(file);
      assert.ok(
        credits.some(
          (credit) =>
            credit.file === `public/${item.image}` &&
            credit.source &&
            credit.license &&
            credit.licenseUrl,
        ),
      );
    }
});
test("collection identifiers and navigation targets remain unambiguous", () => {
  for (const content of contents) {
    assert.equal(
      new Set(content.collections.items.map((item) => item.id)).size,
      content.collections.items.length,
    );
    for (const link of content.nav) assert.ok(link.label && link.href);
    for (const item of content.collections.items)
      assert.ok(item.name && item.category && item.highlights.length);
  }
});
test("template declares static output and no unavailable backend capability", async () => {
  assert.equal(manifest.stack, "react-vite");
  assert.equal(manifest.outputDirectory, "dist");
  assert.deepEqual(manifest.requiredRuntimeCapabilities, []);
  await access(new URL(manifest.contentEntry, root));
  await access(new URL(manifest.styleEntry, root));
  const business = JSON.parse(
    await readFile(new URL("src/content/business.json", root), "utf8"),
  );
  assert.ok(
    business.email === null ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email),
  );
});
