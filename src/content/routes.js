import registry from "../pages/registry.json" with { type: "json" };
const segment = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validateConfig(config) {
  if (
    !config.locales.length ||
    !config.locales.some((item) => item.code === config.defaultLocale)
  )
    throw new Error("Invalid defaultLocale");
  const codes = new Set();
  const prefixes = new Set();
  for (const entry of config.locales) {
    if (
      !/^[a-zA-Z]{2,8}(?:-[a-zA-Z0-9]{2,8})*$/.test(entry.code) ||
      codes.has(entry.code)
    )
      throw new Error("Invalid or duplicate locale code");
    if (!segment.test(entry.prefix) || prefixes.has(entry.prefix))
      throw new Error("Invalid or duplicate locale prefix");
    codes.add(entry.code);
    prefixes.add(entry.prefix);
  }
}
export function routePath(
  config,
  locale,
  page = "home",
  contentId = "",
  definitions = registry,
) {
  validateConfig(config);
  const entry = config.locales.find((item) => item.code === locale);
  if (!entry) throw new Error(`Unknown locale: ${locale}`);
  const definition = definitions.find((item) => item.id === page);
  if (!definition) throw new Error(`Unknown page: ${page}`);
  let path = definition.path;
  if (path.includes("{id}")) {
    if (!segment.test(contentId)) throw new Error("Invalid content slug");
    path = path.replace("{id}", contentId);
  }
  if (
    path &&
    (!path.endsWith("/") ||
      !path
        .slice(0, -1)
        .split("/")
        .every((value) => segment.test(value)))
  )
    throw new Error("Invalid page path");
  return `${locale === config.defaultLocale ? "" : entry.prefix + "/"}${path}`;
}
export function rootPrefix(path) {
  return "../".repeat(path.split("/").filter(Boolean).length) || "./";
}
