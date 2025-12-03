import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const miAprendizajeRoutes: ModuleRoutes = {
  basePath: "mi-aprendizaje",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

