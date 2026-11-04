import type { Product, BusinessConfig } from "./types";
export function filterProducts(
  items: Product[],
  category?: string,
  query?: string,
): Product[];
export function validateBusiness(business: BusinessConfig): void;
export function enquiryHref(email: string | null, productName?: string): string;
