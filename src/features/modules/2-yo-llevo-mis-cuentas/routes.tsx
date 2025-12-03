import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));

export const yoLlevoMisCuentasRoutes: ModuleRoutes = {
  basePath: "yo-llevo-mis-cuentas",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
  ],
};

