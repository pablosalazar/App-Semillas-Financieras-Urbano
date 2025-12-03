import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const yoMeAseguroRoutes: ModuleRoutes = {
  basePath: "yo-me-aseguro",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

