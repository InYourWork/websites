import { locale, localizedPath, page } from "./index";
export function pageUrl(
  page = "home",
  params: Record<string, string> = {},
  hash = "",
) {
  return `${localizedPath(locale, page, params.id ?? "")}${hash}`;
}
export const homeLink = (hash: string) =>
  page === "home" ? hash : pageUrl("home", {}, hash);
