import type { ComponentType } from "react";
import { HomePage } from "./HomePage";
import { ProjectsPage } from "./ProjectsPage";
import { ProjectPage } from "./ProjectPage";
export const components: Record<string, ComponentType> = {
  HomePage,
  ProjectsPage,
  ProjectPage,
};
