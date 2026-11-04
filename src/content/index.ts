import config from "./config.json";
import businessData from "./business.json";
import type { SiteContent, BusinessConfig } from "./types";
import { routePath, rootPrefix, validateConfig } from "./routes.js";
const modules = import.meta.glob<{ default: SiteContent }>("./locales/*.json", {
  eager: true,
});
export const dictionaries: Record<string, SiteContent> = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [
    path.slice("./locales/".length, -".json".length),
    module.default,
  ]),
);
export const business: BusinessConfig = businessData;
validateConfig(config);
for (const entry of config.locales) {
  if (!dictionaries[entry.code])
    throw new Error(`Missing locale: ${entry.code}`);
}
export const locales = config.locales;
export let locale = config.defaultLocale;
export let site = dictionaries[locale]!;
export let page = "home";
export let projectId = "";
export let relativeRoot = "./";
export function configurePage(language: string, kind: string, id = "") {
  if (!dictionaries[language]) throw new Error(`Missing locale: ${language}`);
  const path = routePath(config, language, kind, id);
  locale = language;
  site = dictionaries[language]!;
  page = kind;
  projectId = id;
  relativeRoot = rootPrefix(path);
}
if (typeof document !== "undefined") {
  const data = document.documentElement.dataset;
  configurePage(
    document.documentElement.lang,
    data.page ?? "home",
    data.project ?? "",
  );
}
export type { Project } from "./types";
export const asset = (path: string) => `${relativeRoot}${path}`;
export const localizedPath = (language: string, kind = page, id = projectId) =>
  `${relativeRoot}${routePath(config, language, kind, id)}`;
