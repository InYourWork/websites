type Config = {
  defaultLocale: string;
  locales: { code: string; prefix: string }[];
};
export function validateConfig(config: Config): void;
export function routePath(
  config: Config,
  locale: string,
  page?: string,
  contentId?: string,
  definitions?: { id: string; path: string }[],
): string;
export function rootPrefix(path: string): string;
