import type { ComponentType } from "react";
import { HomePage } from "./HomePage";
import { ProductsPage } from "./ProductsPage";
import { ProductPage } from "./ProductPage";
import { GuidePage } from "./GuidePage";
export const components: Record<string, ComponentType> = {
  HomePage,
  ProductsPage,
  ProductPage,
  GuidePage,
};
