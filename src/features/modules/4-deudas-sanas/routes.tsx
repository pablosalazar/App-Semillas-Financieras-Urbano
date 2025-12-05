import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Instructions = lazy(() => import("./pages/Instructions"));

export const deudasSanasRoutes: ModuleRoutes = {
  basePath: "deudas-sanas",
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
