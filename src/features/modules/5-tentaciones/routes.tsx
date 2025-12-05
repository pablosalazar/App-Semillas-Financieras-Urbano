import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Instructions = lazy(() => import("./pages/Instructions"));

export const tentacionesRoutes: ModuleRoutes = {
  basePath: "tentaciones",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "instrucciones",
      element: <Instructions />,
    },
  ],
};
