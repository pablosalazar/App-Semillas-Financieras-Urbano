import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const trabajoEnComunidadRoutes: ModuleRoutes = {
  basePath: "trabajo-en-comunidad",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

