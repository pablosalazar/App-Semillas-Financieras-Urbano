import type { ModuleRoutes } from "../types";
import { lazy } from "react";
import { ATMProvider } from "./context/ATMContext";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const ATMStart = lazy(() => import("./pages/ATMStart"));
const InsertCard = lazy(() => import("./pages/InsertCard"));

export const cajeroAutomaticoRoutes: ModuleRoutes = {
  basePath: "cajero-automatico",
  routes: [
    {
      element: <ATMProvider />,
      children: [
        {
          path: "",
          element: <IntroPage />,
        },
        {
          path: "inicio",
          element: <ATMStart />,
        },
        {
          path: "insertar-tarjeta",
          element: <InsertCard />,
        },
      ],
    },
  ],
};
