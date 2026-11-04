import type { ComponentType } from "react";
import { HomePage } from "./HomePage";
import { CollectionsPage } from "./CollectionsPage";
import { CollectionPage } from "./CollectionPage";
import { StoryPage } from "./StoryPage";
export const components: Record<string, ComponentType> = {
  HomePage,
  CollectionsPage,
  CollectionPage,
  StoryPage,
};
