import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const deudasSanasRoutes: ModuleRoutes = {
  basePath: "deudas-sanas",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

