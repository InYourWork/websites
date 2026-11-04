import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { routePath, rootPrefix } from "../src/content/routes.js";
const read = async (name) =>
  JSON.parse(
    await readFile(new URL(`../src/content/${name}`, import.meta.url), "utf8"),
  );
const config = await read("config.json");
const baseline = await read(`locales/${config.defaultLocale}.json`);
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape(value[key])]),
    );
  return value === null ? "null" : typeof value;
}
test("every enabled language provides a complete matching content structure", async () => {
  assert.ok(config.locales.some((item) => item.code === config.defaultLocale));
  for (const { code } of config.locales) {
    const content = await read(`locales/${code}.json`);
    assert.deepEqual(shape(content), shape(baseline));
    assert.deepEqual(
      content.nav.map((item) => item.href),
      baseline.nav.map((item) => item.href),
    );
    assert.deepEqual(
      content.products.categories.map((item) => item.id),
      baseline.products.categories.map((item) => item.id),
    );
    assert.deepEqual(
      content.products.items.map((item) => item.id),
      baseline.products.items.map((item) => item.id),
    );
    assert.ok(
      content.meta.title && content.meta.description && content.ui.language,
    );
  }
});
test("default locale has no prefix and other locales retain page paths", () => {
  for (const defaultEntry of config.locales) {
    const variant = { ...config, defaultLocale: defaultEntry.code };
    for (const entry of config.locales) {
      const prefix =
        entry.code === variant.defaultLocale ? "" : `${entry.prefix}/`;
      assert.equal(routePath(variant, entry.code), prefix);
      for (const product of baseline.products.items) {
        const path = routePath(variant, entry.code, "product", product.id);
        assert.equal(path, `${prefix}products/${product.id}/`);
        assert.equal(
          rootPrefix(path),
          "../".repeat(path.split("/").filter(Boolean).length),
        );
      }
    }
  }
  assert.throws(() =>
    routePath(config, config.defaultLocale, "product", "../bad"),
  );
});
