import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const serviciosFinancierosRoutes: ModuleRoutes = {
  basePath: "servicios-financieros",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

