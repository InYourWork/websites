import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { renderPages } from "../.ssg/render.js";
import { outputFile, renderHtml } from "./html.mjs";
const shell = await readFile("dist/index.html", "utf8");
const pages = renderPages();
const outputs = pages.map((page) => ({
  page,
  file: outputFile("dist", page.path),
}));
if (new Set(outputs.map((item) => item.file)).size !== outputs.length)
  throw new Error("Duplicate output paths");
for (const { page, file } of outputs) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, renderHtml(shell, page));
}
console.log(`Generated ${pages.length} static pages`);
