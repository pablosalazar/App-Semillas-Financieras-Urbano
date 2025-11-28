import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const ATMStart = lazy(() => import("./pages/ATMStart"));

export const cajeroAutomaticoRoutes: ModuleRoutes = {
  basePath: "cajero-automatico",
  routes: [
    {
      path: "",
      element: <IntroPage />,
    },
    {
      path: "inicio",
      element: <ATMStart />,
    },
  ],
};
