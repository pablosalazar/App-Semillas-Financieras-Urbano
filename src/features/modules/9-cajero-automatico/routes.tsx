import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const IntroPage = lazy(() => import("./pages/IntroPage"));

export const cajeroAutomaticoRoutes: ModuleRoutes = {
  basePath: "cajero-automatico",
  routes: [
    {
      path: "",
      element: <IntroPage />,
    },
  ],
};
