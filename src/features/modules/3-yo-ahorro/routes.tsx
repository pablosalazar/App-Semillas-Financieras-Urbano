import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const yoAhorroRoutes: ModuleRoutes = {
  basePath: "yo-ahorro",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

