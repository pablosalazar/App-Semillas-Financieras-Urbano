import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Questions = lazy(() => import("./pages/Questions"));

export const evaluacionInicialRoutes: ModuleRoutes = {
  basePath: "evaluacion-inicial",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "preguntas",
      element: <Questions />,
    },
  ],
};
