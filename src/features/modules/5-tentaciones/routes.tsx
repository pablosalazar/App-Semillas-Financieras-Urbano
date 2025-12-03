import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const tentacionesRoutes: ModuleRoutes = {
  basePath: "tentaciones",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

