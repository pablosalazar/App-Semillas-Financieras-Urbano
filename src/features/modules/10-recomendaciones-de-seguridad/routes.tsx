import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const recomendacionesDeSeguridadRoutes: ModuleRoutes = {
  basePath: "recomendaciones-de-seguridad",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

