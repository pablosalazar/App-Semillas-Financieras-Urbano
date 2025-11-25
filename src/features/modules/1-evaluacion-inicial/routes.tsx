import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const QuestionsPages = lazy(() => import("./pages/QuestionsPages"));

export const evaluacionInicialRoutes: ModuleRoutes = {
  basePath: "evaluacion-inicial",
  routes: [
    {
      path: "",
      element: <IntroPage />,
    },
    {
      path: "intro",
      element: <IntroPage />,
    },
    {
      path: "preguntas",
      element: <QuestionsPages />,
    },
  ],
};
