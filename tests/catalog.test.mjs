import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  filterProducts,
  validateBusiness,
  enquiryHref,
} from "../src/content/catalog.js";
import config from "../src/content/config.json" with { type: "json" };

test("catalog search and category filters compose without changing source order", async () => {
  for (const locale of config.locales) {
    const content = JSON.parse(
      await readFile(
        new URL(`../src/content/locales/${locale.code}.json`, import.meta.url),
        "utf8",
      ),
    );
    const items = content.products.items;
    const snapshot = structuredClone(items);
    const first = items[0];
    assert.deepEqual(filterProducts(items), items);
    assert.deepEqual(
      filterProducts(items, first.category),
      items.filter((item) => item.category === first.category),
    );
    assert.deepEqual(
      filterProducts(items, "", `  ${first.name.toUpperCase()}  `),
      [first],
    );
    assert.deepEqual(filterProducts(items, "missing", first.name), []);
    assert.deepEqual(filterProducts(items, "", "no-such-product-987654"), []);
    assert.deepEqual(items, snapshot);
  }
});
test("quote enquiries use the contact section or a product-specific email", () => {
  assert.doesNotThrow(() => validateBusiness({ email: null }));
  assert.doesNotThrow(() => validateBusiness({ email: "hello@example.com" }));
  assert.throws(() => validateBusiness({ email: "bad email" }));
  assert.equal(enquiryHref(null, "Example"), "#contact");
  assert.equal(
    enquiryHref("hello@example.com", "Name & details?"),
    "mailto:hello@example.com?subject=Name%20%26%20details%3F",
  );
});

test("contact and product enquiry URLs preserve special-character recipients", () => {
  for (const email of [
    "sales#team@example.com",
    "sales?team@example.com",
    "sales+team@example.com",
    "sales%team@example.com",
    "sales&team@example.com",
  ]) {
    validateBusiness({ email });
    for (const subject of [undefined, "Product #1 & details?"]) {
      const url = new URL(enquiryHref(email, subject));
      assert.equal(url.protocol, "mailto:");
      assert.equal(decodeURIComponent(url.pathname), email);
      assert.equal(url.hash, "");
      assert.equal(url.searchParams.get("subject"), subject ?? null);
      assert.deepEqual(
        [...url.searchParams.keys()],
        subject ? ["subject"] : [],
      );
    }
  }
});
