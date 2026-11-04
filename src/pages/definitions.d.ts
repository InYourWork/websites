import type { SiteContent } from "../content/types";
interface Definition {
  id: string;
  title: string;
  collection?: string;
  description?: string;
}
export function expandPages(
  content: SiteContent,
  definitions: Definition[],
): { page: string; id: string; title: string; description: string }[];
