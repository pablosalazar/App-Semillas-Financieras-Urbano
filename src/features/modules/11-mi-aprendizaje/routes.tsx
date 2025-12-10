import type { ModuleRoutes } from "../types";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Activity = lazy(() => import("./pages/Activity"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));

export const miAprendizajeRoutes: ModuleRoutes = {
  basePath: "mi-aprendizaje",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "actividad",
      element: <Activity />,
    },
    {
      path: "feedback",
      element: <Feedback />,
    },
    {
      path: "reward",
      element: <Reward />,
    },
  ],
};

